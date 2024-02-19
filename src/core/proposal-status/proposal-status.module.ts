import { Module, OnModuleInit } from '@nestjs/common';
import { ProposalStatusService } from './proposal-status.service';
import { ProposalStatusController } from './proposal-status.controller';
import { StatusType } from '#src/core/proposal-status/types/status.type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProposalStatus, ProposalHistoryEntity])],
  controllers: [ProposalStatusController],
  providers: [ProposalStatusService],
  exports: [ProposalStatusService],
})
export class ProposalStatusModule implements OnModuleInit {
  constructor(private readonly statusService: ProposalStatusService) {}

  async onModuleInit() {
    const statuses = await this.statusService.find({});

    if (statuses.length === 0) {
      let i = 1;
      for (const [type, name] of Object.entries(StatusType)) {
        await this.statusService.save({
          id: i,
          name: name,
          statusType: type,
        });
        i++;
      }
    }
  }
}
