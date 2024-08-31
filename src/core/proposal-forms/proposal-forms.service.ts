import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalFormEntity } from '#src/core/proposal-forms/entities/proposal-form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalFormRdo } from '#src/core/proposal-forms/rdo/proposal-form.rdo';

@Injectable()
export class ProposalFormsService extends BaseEntityService<
  ProposalFormEntity,
  ProposalFormRdo
> {
  constructor(
    @InjectRepository(ProposalFormEntity)
    private readonly proposalFormRepository: Repository<ProposalFormEntity>,
  ) {
    super(proposalFormRepository, ProposalFormRdo);
  }
}
