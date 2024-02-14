import { Module } from '@nestjs/common';
import { ProposalEventsController } from './proposal-events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalEventEntity } from '#src/core/history/entities/proposal-event.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { ProposalEventService } from '#src/core/history/proposal-event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalEventEntity,
      ProposalStatus,
      ProposalsEntity,
      UserEntity,
    ]),
  ],
  controllers: [ProposalEventsController],
  providers: [ProposalEventService],
  exports: [ProposalEventService],
})
export class ProposalEventModule {}
