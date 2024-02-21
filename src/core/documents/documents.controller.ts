import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetDocumentRdo } from '#src/core/documents/rdo/get-document.rdo';
import { ResponseMessage } from '#src/core/documents/types/yandex-gpt-response.type';
import { type Response } from 'express';
import { CreateDocumentDto } from '#src/core/documents/dto/create-document.dto';

@ApiTags('Documents')
@Controller('api/proposals/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @ApiOkResponse({ type: ResponseMessage })
  @ApiBody({ type: CreateDocumentDto })
  @Post()
  async generate(
    @Res({ passthrough: true }) response: Response,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    response.status(200);

    return await this.documentsService
      .generate(createDocumentDto)
      .catch((error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiOkResponse({ type: [GetDocumentRdo] })
  @Get()
  async findAll(): Promise<GetDocumentRdo[]> {
    const documents = await this.documentsService.find({});

    return documents.map((document) => new GetDocumentRdo(document));
  }

  @ApiOkResponse({ type: GetDocumentRdo })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GetDocumentRdo> {
    return new GetDocumentRdo(
      await this.documentsService.findOne({ where: { id } }),
    );
  }

  @ApiOkResponse({ type: GetDocumentRdo })
  @Get(':name')
  async findOneByName(@Param('name') name: string): Promise<GetDocumentRdo> {
    return new GetDocumentRdo(
      await this.documentsService.findOne({ where: { name } }),
    );
  }

  @Get('file/:id')
  async findOneFile(@Param('id') id: number): Promise<StreamableFile> {
    return await this.documentsService.getFile(id);
  }

  @Get('file/:name')
  async findOneFileByName(
    @Param('name') name: string,
  ): Promise<StreamableFile> {
    return await this.documentsService.getFile(name);
  }
}
