import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProposalHistoryService } from '#src/core/history/proposal-history.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposal History')
@Controller('api/proposals/history')
export class ProposalHistoryController {
  constructor(private readonly proposalEventService: ProposalHistoryService) {}

  // @Post()
  // async create(@Body() createHistoryDto: CreateEventDto) {
  //   return await this.proposalEventService.save(createHistoryDto);
  // }

  @Get()
  async findAll() {
    return await this.proposalEventService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.proposalEventService.findOne({ where: { id } });
  }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateHistoryDto: UpdateEventDto) {
  //   return  await this.historyService.update(+id, updateHistoryDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.proposalEventService.removeOne({ where: { id } });
  }
}
