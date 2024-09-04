import { HttpStatus, Inject, Injectable, StreamableFile } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalAssetEntity } from '#src/core/proposal-assets/entities/proposal-asset.entity';
import { Repository } from 'typeorm';
import { storageConfig } from '#src/common/configs/storage.config';
import { join } from 'path';
import { createReadStream } from 'node:fs';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { access, mkdir, rename } from 'node:fs/promises';
import StorageExceptions = AllExceptions.StorageExceptions;

@Injectable()
export class ProposalAssetsService extends BaseEntityService<ProposalAssetEntity> {
  constructor(
    @Inject(ProposalAssetEntity)
    protected readonly proposalAssetRepository: Repository<ProposalAssetEntity>,
  ) {
    super(proposalAssetRepository);
  }

  async uploadFiles(files: Express.Multer.File[], proposalId: number) {
    const proposalAssetsDest = join(
      storageConfig.path,
      storageConfig.proposalAssetsDir,
    );

    return await Promise.all(
      files.map(async (file) => {
        const t1Dir = file.filename.slice(0, 2);
        const t2Dir = file.filename.slice(2, 4);

        await access(join(proposalAssetsDest, t1Dir)).catch(
          async (err: Error) => {
            await mkdir(join(proposalAssetsDest, t1Dir));
            await mkdir(join(proposalAssetsDest, t1Dir, t2Dir));
          },
        );

        await access(join(proposalAssetsDest, t1Dir, t2Dir)).catch(
          async (err: Error) => {
            await mkdir(join(proposalAssetsDest, t1Dir, t2Dir));
          },
        );

        await rename(
          join(proposalAssetsDest, file.filename),
          join(proposalAssetsDest, t1Dir, t2Dir, file.filename),
        );

        return await this.save({
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          destination: join(t1Dir, t2Dir),
          proposal: { id: proposalId },
        });
      }),
    );
  }

  async getAsset(
    name: string,
  ): Promise<{ mimetype: string; buffer: StreamableFile }> {
    const assetEntity = await this.findOne({ where: { filename: name } });

    if (!assetEntity) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'StorageExceptions',
        StorageExceptions.NotFound,
      );
    }

    const path = join(
      storageConfig.path,
      storageConfig.proposalAssetsDir,
      assetEntity.destination,
      assetEntity.filename,
    );

    const readStream = createReadStream(path);

    //TODO NO FILE

    return {
      buffer: new StreamableFile(readStream),
      mimetype: assetEntity.mimetype,
    };
  }

  private checkBufferExt(buffer: Buffer): boolean {
    const bufferStr = buffer.toString('hex');

    return Object.values(storageConfig.allowedFiles).some((signature) =>
      bufferStr.includes(signature.toLowerCase()),
    );
  }
}
