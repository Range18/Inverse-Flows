import { CustomQuestion } from '#src/core/proposals/types/content.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ nullable: false, description: 'Название' })
  name: string;

  @ApiProperty({ nullable: false, description: 'Описание' })
  description: string;

  @ApiProperty({
    nullable: false,
    description: 'Как поможет достичь целей компании?',
  })
  aboutCompanyAim: string;

  @ApiProperty({ nullable: true, description: 'Цель', required: false })
  proposalAim: string;

  @ApiProperty({ nullable: false, description: 'Тип' })
  proposalType: string;

  @ApiProperty({ nullable: false, description: 'Ответ на вопрос о плюсах' })
  benefits: string;

  @ApiProperty({
    nullable: true,
    description: 'Ответ на вопрос об ограничивающих факторах',
    required: false,
  })
  limitFactors?: string;

  @ApiProperty({
    nullable: true,
    description: 'Кастомные вопросы',
    type: [CustomQuestion],
    required: false,
  })
  customQuestions?: CustomQuestion[];
}
