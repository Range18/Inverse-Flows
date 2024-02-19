import { Module } from '@nestjs/common';
import { ProposalHistoryController } from './proposal-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { ProposalHistoryService } from '#src/core/history/proposal-history.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalHistoryEntity,
      ProposalStatus,
      ProposalsEntity,
      UserEntity,
    ]),
  ],
  controllers: [ProposalHistoryController],
  providers: [ProposalHistoryService],
  exports: [ProposalHistoryService],
})
export class ProposalHistoryModule {}
