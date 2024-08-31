import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalFormEntity } from '#src/core/proposal-forms/entities/proposal-form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProposalFormsService extends BaseEntityService<ProposalFormEntity> {
  constructor(
    @InjectRepository(ProposalFormEntity)
    private readonly proposalFormRepository: Repository<ProposalFormEntity>,
  ) {
    super(proposalFormRepository);
  }
}
