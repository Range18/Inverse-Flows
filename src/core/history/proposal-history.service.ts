import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { BaseEntityService } from '#src/common/base-entity.service';

@Injectable()
export class ProposalHistoryService extends BaseEntityService<ProposalHistoryEntity> {
  constructor(
    @InjectRepository(ProposalHistoryEntity)
    private readonly proposalEventRepository: Repository<ProposalHistoryEntity>,
  ) {
    super(proposalEventRepository);
  }
}
