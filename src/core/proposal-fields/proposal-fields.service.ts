import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalFieldEntity } from '#src/core/proposal-fields/entities/proposal-field.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProposalFieldsService extends BaseEntityService<ProposalFieldEntity> {
  constructor(
    @InjectRepository(ProposalFieldEntity)
    private readonly proposalFieldsRepository: Repository<ProposalFieldEntity>,
  ) {
    super(proposalFieldsRepository);
  }
}
