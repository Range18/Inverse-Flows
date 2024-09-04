import { Controller, Get, Param } from '@nestjs/common';
import { ProposalStatusService } from './proposal-status.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposal Statuses')
@Controller('proposals/statuses')
export class ProposalStatusController {
  constructor(private readonly proposalStatusService: ProposalStatusService) {}

  @Get()
  async findAll() {
    return await this.proposalStatusService.find({}, true);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.proposalStatusService.findOne({ where: { id } }, true);
  }
}
