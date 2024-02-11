import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream, createWriteStream } from 'fs';
import { uid } from 'uid';
import { storageConfig } from '#src/common/configs/storage.config';
import { join } from 'path';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import axios from 'axios';
import { textGenerationConfig } from '#src/common/configs/text-generation.config';
import DocumentExceptions = AllExceptions.DocumentExceptions;

@Injectable()
export class DocumentsService extends BaseEntityService<DocumentEntity> {
  private IAMToken: { value: string; expireAt: Date };

  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {
    super(documentRepository);
  }

  async generate(content: object) {
    if (
      !this.IAMToken ||
      Date.now() - this.IAMToken.expireAt.getTime() > 3_600_000
    ) {
      const response = await axios.post(
        'https://iam.api.cloud.yandex.net/iam/v1/tokens',
        {
          yandexPassportOauthToken: textGenerationConfig.OAuthToken,
        },
      );

      this.IAMToken = {
        value: response.data['iamToken'],
        expireAt: new Date(Date.now()),
      };
    }

    const prompt = {
      modelUri: `gpt://${textGenerationConfig.folderId}/yandexgpt-lite`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: '1000',
      },
      messages: [
        {
          role: 'system',
          text: 'Ты очень хорошо составляешь и дополняешь документы.',
        },
        {
          role: 'user',
          text: `Составь документ для реализации идеи в компании. Выдели тезисы в html тег <bold>. 
                 Ниже представлен объект, который ты обязательно должен использовать: 
                 ${JSON.stringify(content)}`,
        },
      ],
    };

    const response = await axios
      .post(
        'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
        prompt,
        {
          headers: {
            Authorization: `Bearer ${this.IAMToken.value}`,
            'x-folder-id': textGenerationConfig.folderId,
          },
        },
      )
      .catch((error) => {
        throw new Error(error.response.data.error);
      });

    return response.data['result']['alternatives'][0];
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
