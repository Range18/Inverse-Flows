import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetDocumentRdo } from '#src/core/documents/rdo/get-document.rdo';

@ApiTags('Documents')
@Controller('api/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  async generate(@Body() content: object) {
    return await this.documentsService.generate(content);
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
