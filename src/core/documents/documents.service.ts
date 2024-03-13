import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { uid } from 'uid';
import { storageConfig } from '#src/common/configs/storage.config';
import { join } from 'path';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import axios from 'axios';
import { textGenerationConfig } from '#src/common/configs/text-generation.config';
import {
  ResponseMessage,
  YandexGptResponse,
} from '#src/core/documents/types/yandex-gpt-response.type';
import { CustomQuestion } from '#src/core/proposals/types/content.type';
import {
  systemMessage,
  userPromptTemplate,
} from '#src/core/documents/document.constants';
import {
  ContentProperties,
  ProcessedContent,
} from '#src/core/proposals/types/processed-content.type';
import { CreateDocumentDto } from '#src/core/documents/dto/create-document.dto';
import * as console from 'console';
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

  private async checkToken() {
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
  }

  async generate(
    createDocumentDto: CreateDocumentDto,
  ): Promise<ResponseMessage> {
    await this.checkToken();

    const processedContent: ProcessedContent = {
      name: createDocumentDto.name,
      aboutCompanyAim: createDocumentDto.aboutCompanyAim,
      description: createDocumentDto.description,
      proposalAim: createDocumentDto.proposalAim,
      proposalType: createDocumentDto.proposalType,
      benefits: createDocumentDto.benefits,
      limitFactors: createDocumentDto.limitFactors,
      customQuestions: createDocumentDto.customQuestions,
    };

    let promptText = '';

    for (const [key, value] of Object.entries(processedContent)) {
      if (value) {
        if (key === 'customQuestions') {
          for (const pair of value as CustomQuestion[]) {
            promptText += `${pair.question}: ${pair.answer}\n`;
          }
          continue;
        }

        if (typeof value === 'object') {
          promptText += `${ContentProperties[key]}: ${JSON.stringify(value)}\n`;
          continue;
        }

        if (Array.isArray(value)) {
          promptText += `${ContentProperties[key]}: `;
          for (const element of value) {
            if (typeof value === 'object') {
              promptText += `${JSON.stringify(value)} `;
              continue;
            }
            promptText += `${element} `;
          }
          continue;
        }

        promptText += `${ContentProperties[key]}: ${value}\n`;
      }
    }

    console.log(promptText);

    const prompt = {
      modelUri: `gpt://${textGenerationConfig.folderId}/yandexgpt-lite`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: '2000',
      },
      messages: [
        {
          role: 'system',
          text: systemMessage,
        },
        {
          role: 'user',
          text: `${userPromptTemplate}\n ${promptText}`,
        },
      ],
    };

    const response = await axios
      .post<YandexGptResponse>(
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
        throw new HttpException(
          error.response.data.error,
          HttpStatus.BAD_REQUEST,
        );
      });

    return response.data.result.alternatives[0];
  }

  async create(proposal: ProposalsEntity, documentContent: string) {
    const documentName = uid(12); // Генерация имени файла

    const documentPath = join(
      storageConfig.path,
      storageConfig.innerDocuments,
      `${documentName}.md`,
    ); // Путь до файла

    // //TODO Error
    // const pdf = await mdToPdf({ content: documentContent }).catch((err) => {
    //   // Тут и происходит ошибка
    //   // err = Error: listen EPERM: operation not permitted ::to
    //   // Библиотека не может создать локальный сервер для конвертации текста в PDF файл
    //   throw new HttpException(
    //     err + 'to pdf process error',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }); // Конвертация из текста в файл PDF

    const writeStream = fs.createWriteStream(documentPath); //Создание потока записи по пути

    writeStream.on('error', (err) => {
      throw new HttpException(
        err + 'WRITE in file error',
        HttpStatus.BAD_REQUEST,
      );
    });

    writeStream.write(documentContent);

    // if (pdf) {
    //   writeStream.write(pdf.content); // Запись в файл
    // }

    writeStream.close(); // Закрытие потока

    return await this.save({ name: `${documentName}.md`, proposal }); // Сохранение документа в базе данных и возврат объекта
  }

  async getFile(id: number): Promise<StreamableFile>;
  async getFile(name: string): Promise<StreamableFile>;
  async getFile(idOrName: string | number): Promise<StreamableFile> {
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
      join(storageConfig.path, storageConfig.innerDocuments, document.name),
    );

    return new StreamableFile(readStream);
  }
}
