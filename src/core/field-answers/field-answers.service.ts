import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { FieldAnswerEntity } from '#src/core/field-answers/entities/field-answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldAnswerRdo } from '#src/core/field-answers/rdo/field-answer.rdo';

@Injectable()
export class FieldAnswersService extends BaseEntityService<
  FieldAnswerEntity,
  FieldAnswerRdo
> {
  constructor(
    @InjectRepository(FieldAnswerEntity)
    private readonly fieldAnswerRepository: Repository<FieldAnswerEntity>,
  ) {
    super(fieldAnswerRepository, FieldAnswerRdo);
  }
}
