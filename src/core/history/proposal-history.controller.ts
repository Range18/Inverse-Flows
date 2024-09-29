import { Controller, Get, Param } from '@nestjs/common';
import { ProposalHistoryService } from '#src/core/history/proposal-history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposal History')
@Controller('proposals/history')
export class ProposalHistoryController {
  constructor(private readonly proposalEventService: ProposalHistoryService) {}

  @Get()
  async findAll() {
    return await this.proposalEventService.find({}, true);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.proposalEventService.findOne({ where: { id } }, true);
  }
}
