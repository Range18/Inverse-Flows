import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { readFile, unlink } from 'fs/promises';
import { storageConfig } from '#src/common/configs/storage.config';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { UserService } from '#src/core/users/user.service';
import { join } from 'path';
import UserExceptions = AllExceptions.UserExceptions;
import StorageExceptions = AllExceptions.StorageExceptions;

@Injectable()
export class AssetsService extends BaseEntityService<AssetEntity> {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetsRepository: Repository<AssetEntity>,
    private readonly userService: UserService,
  ) {
    super(assetsRepository);
  }

  async upload(userId: number, file: Express.Multer.File) {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { avatar: true },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const buffer = await readFile(file.path);

    if (!this.checkBufferExt(buffer)) {
      await unlink(file.path);

      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'StorageExceptions',
        StorageExceptions.ExtNotAllowed,
      );
    }

    if (user.avatar) {
      await unlink(
        join(storageConfig.path, storageConfig.innerAvatars, user.avatar.name),
      );

      return await this.updateOne(
        { where: { name: user.avatar.name } },
        { name: file.filename, mimetype: file.mimetype },
      );
    }

    return await this.save({
      user: user,
      name: file.filename,
      mimetype: file.mimetype,
    });
  }

  async getFile(
    userId: number,
  ): Promise<{ streamableFile: StreamableFile; mimetype: string }> {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { avatar: true },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    if (!user.avatar) {
      const readableFile = await readFile(
        join(
          storageConfig.path,
          storageConfig.innerAvatars,
          storageConfig.defaultAvatar,
        ),
      );

      return {
        streamableFile: new StreamableFile(readableFile),
        mimetype: storageConfig.defaultMimetype,
      };
    }

    const readableFile = await readFile(
      join(storageConfig.path, storageConfig.innerAvatars, user.avatar.name),
    );

    return {
      streamableFile: new StreamableFile(readableFile),
      mimetype: user.avatar.mimetype,
    };
  }

  async getFileByName(
    name: string,
  ): Promise<{ streamableFile: StreamableFile; mimetype: string }> {
    const file = await this.findOne({
      where: { name },
    });

    if (!file) {
      const readableFile = await readFile(
        join(
          storageConfig.path,
          storageConfig.innerAvatars,
          storageConfig.defaultAvatar,
        ),
      );

      return {
        streamableFile: new StreamableFile(readableFile),
        mimetype: storageConfig.defaultMimetype,
      };
    }

    const readableFile = await readFile(
      join(storageConfig.path, storageConfig.innerAvatars, file.name),
    );

    return {
      streamableFile: new StreamableFile(readableFile),
      mimetype: file.mimetype,
    };
  }

  async delete(userId: number) {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { avatar: true },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    if (!user.avatar) {
      return;
    }

    await unlink(
      join(storageConfig.path, storageConfig.innerAvatars, user.avatar.name),
    );

    await this.removeOne({ where: { id: user.avatar.id } });
  }

  private checkBufferExt(buffer: Buffer): boolean {
    const bufferStr = buffer.toString('hex');

    return Object.values(storageConfig.allowedFiles).some((signature) =>
      bufferStr.includes(signature.toLowerCase()),
    );
  }
}
