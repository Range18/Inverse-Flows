import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProposalEventEntity } from '#src/core/history/entities/proposal-event.entity';
import { BaseEntityService } from '#src/common/base-entity.service';

@Injectable()
export class ProposalEventService extends BaseEntityService<ProposalEventEntity> {
  constructor(
    @InjectRepository(ProposalEventEntity)
    private readonly proposalEventRepository: Repository<ProposalEventEntity>,
  ) {
    super(proposalEventRepository);
  }
}
