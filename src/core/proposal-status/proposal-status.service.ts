import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProposalStatusService extends BaseEntityService<ProposalStatus> {
  constructor(
    @InjectRepository(ProposalStatus)
    private readonly statusRepository: Repository<ProposalStatus>,
  ) {
    super(statusRepository);
  }
}
