import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalFieldEntity } from '#src/core/proposal-fields/entities/proposal-field.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalFieldRdo } from '#src/core/proposal-fields/rdo/proposal-field.rdo';

@Injectable()
export class ProposalFieldsService extends BaseEntityService<
  ProposalFieldEntity,
  ProposalFieldRdo
> {
  constructor(
    @InjectRepository(ProposalFieldEntity)
    private readonly proposalFieldsRepository: Repository<ProposalFieldEntity>,
  ) {
    super(proposalFieldsRepository, ProposalFieldRdo);
  }
}
