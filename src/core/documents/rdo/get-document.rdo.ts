import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetDocumentRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(document: DocumentEntity) {
    this.id = document.id;
    this.name = document.name;
    this.createdAt = document.createdAt;
  }
}
