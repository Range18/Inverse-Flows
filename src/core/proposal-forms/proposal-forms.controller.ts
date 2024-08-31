import { Controller, Get, Param } from '@nestjs/common';
import { ProposalFormsService } from './proposal-forms.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposal forms')
@Controller('proposal-forms')
export class ProposalFormsController {
  constructor(private readonly proposalFormsService: ProposalFormsService) {}

  @Get()
  async findAll() {
    return await this.proposalFormsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.proposalFormsService.findOne({ where: { id } });
  }
}
