import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProposalEventService } from '#src/core/history/proposal-event.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposal Events')
@Controller('api/proposal/events')
export class ProposalEventsController {
  constructor(private readonly proposalEventService: ProposalEventService) {}

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
