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
import { createReadStream } from 'fs';
import { uid } from 'uid';
import { storageConfig } from '#src/common/configs/storage.config';
import { join } from 'path';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import axios from 'axios';
import { textGenerationConfig } from '#src/common/configs/text-generation.config';
import { jsPDF as JsPDF } from 'jspdf';
import { font } from '#src/common/Montserrat-Regular-normal';
import {
  ResponseMessage,
  YandexGptResponse,
} from '#src/core/documents/types/yandex-gpt-response.type';
import {
  Content,
  customQuestion,
} from '#src/core/proposals/types/content.type';
import {
  systemMessage,
  userPromptTemplate,
} from '#src/core/documents/document.constants';
import { DepartmentsService } from '#src/core/departments/departments.service';
import { GetDepartmentRdo } from '#src/core/departments/rdo/get-department.rdo';
import {
  ContentProperties,
  ProcessedContent,
} from '#src/core/proposals/types/processed-content.type';
import DocumentExceptions = AllExceptions.DocumentExceptions;
import DepartmentExceptions = AllExceptions.DepartmentExceptions;

@Injectable()
export class DocumentsService extends BaseEntityService<DocumentEntity> {
  private IAMToken: { value: string; expireAt: Date };

  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
    private readonly departmentService: DepartmentsService,
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

  async generate(content: Content): Promise<ResponseMessage> {
    await this.checkToken();

    const department = await this.departmentService.findOne({
      where: { id: content.department },
    });

    if (!department) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'DepartmentExceptions',
        DepartmentExceptions.DepartmentNotFound,
      );
    }

    const additionalDepartments: Omit<GetDepartmentRdo, 'id'>[] = [];

    for (const id of content.additionalDepartments) {
      const entity = await this.departmentService.findOne({
        where: { id: id },
      });

      if (!entity) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'DepartmentExceptions',
          DepartmentExceptions.DepartmentNotFound,
        );
      }

      additionalDepartments.push({
        name: entity.name,
        description: entity.description,
      });
    }

    const processedContent: ProcessedContent = {
      proposalAim: content.proposalAim,
      proposalType: content.proposalType,
      benefits: content.benefits,
      limitFactors: content.limitFactors,
      customDepartment: content.customDepartment,
      customQuestions: content.customQuestions,
      additionalDepartments: additionalDepartments,
      department: {
        name: department.name,
        description: department.description,
      },
    };

    let promptText = '';

    for (const [key, value] of Object.entries(processedContent)) {
      if (value) {
        if (key === 'customQuestions') {
          for (const pair of value as customQuestion[]) {
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
    const documentName = uid(12);

    const pdf = new JsPDF();

    pdf.addFileToVFS('Montserrat-Regular-normal.ttf', font);
    pdf.addFont(
      'Montserrat-Regular-normal.ttf',
      'Montserrat-Regular',
      'normal',
    );
    pdf.setFont('Montserrat-Regular');

    // pdf.text(`${content['name']}\n`, 10, 10);
    pdf.text(documentContent, 10, 10, { maxWidth: 180 });

    pdf.save(join(storageConfig.path, `${documentName}.pdf`));

    return await this.save({ name: `${documentName}.pdf`, proposal });
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