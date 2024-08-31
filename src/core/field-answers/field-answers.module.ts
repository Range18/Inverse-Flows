import { Module } from '@nestjs/common';
import { FieldAnswersService } from './field-answers.service';
import { FieldAnswersController } from './field-answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldAnswerEntity } from '#src/core/field-answers/entities/field-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FieldAnswerEntity])],
  controllers: [FieldAnswersController],
  providers: [FieldAnswersService],
})
export class FieldAnswersModule {}
