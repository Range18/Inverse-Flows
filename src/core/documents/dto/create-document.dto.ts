import { Content } from '#src/core/proposals/types/content.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ type: Content })
  content: Content;
}
