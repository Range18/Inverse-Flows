import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream, createWriteStream } from 'fs';
import { uid } from 'uid';
import { storageConfig } from '#src/common/configs/storage.config';
import { join } from 'path';
import { ProposalsEntity } from '#src/core/proposals/proposals.entity';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import DocumentExceptions = AllExceptions.DocumentExceptions;

@Injectable()
export class DocumentsService extends BaseEntityService<DocumentEntity> {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {
    super(documentRepository);
  }

  async create(proposal: ProposalsEntity) {
    const documentName = uid(12);

    const writeStream = createWriteStream(
      join(storageConfig.path, `${documentName}.md`),
    );

    writeStream.write(`${proposal.name}\n`);

    for (const value of Object.entries(JSON.parse(proposal.content))) {
      writeStream.write(`${value[0]}: ${value[1]}\n`);
    }

    writeStream.close();

    return await this.save({ name: `${documentName}.md`, proposal: proposal });
  }

  async getFile(id: number);
  async getFile(name: string);
  async getFile(idOrName: string | number) {
    const document =
      typeof idOrName === 'number'
        ? await this.findOne({ where: { id: idOrName } })
        : await this.findOne({ where: { name: idOrName } });

    if (!document) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'DocumentExceptions',
        DocumentExceptions.DocumentNotFound,
      );
    }

    const readStream = createReadStream(
      join(storageConfig.path, document.name),
    );

    return new StreamableFile(readStream);
  }
}
