import { ApiProperty } from '@nestjs/swagger';

export class CustomQuestion {
  @ApiProperty({ nullable: false })
  question: string;

  @ApiProperty({ nullable: false })
  answer: string;
}

export class Content {
  @ApiProperty({
    nullable: false,
    description: 'Как поможет достичь целей компании?',
  })
  aboutCompanyAim: string;

  @ApiProperty({ nullable: false, description: 'Цель' })
  proposalAim: string;

  @ApiProperty({ nullable: false, description: 'Ответ на вопрос о плюсах' })
  benefits: string;

  @ApiProperty({
    nullable: true,
    description: 'Ответ на вопрос об ограничивающих факторах',
    required: false,
  })
  limitFactors: string;

  @ApiProperty({
    nullable: true,
    description: 'Кастомные вопросы',
    type: [CustomQuestion],
    required: false,
  })
  customQuestions?: CustomQuestion[];
}
