import { Controller, Get, Param } from '@nestjs/common';
import { ProposalFormsService } from './proposal-forms.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposal forms')
@Controller('proposal-forms')
export class ProposalFormsController {
  constructor(private readonly proposalFormsService: ProposalFormsService) {}

  @Get()
  async findAll() {
    return this.proposalFormsService.formatToDto(
      await this.proposalFormsService.find({
        order: { place: 'ASC', fields: { place: 'ASC' } },
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.proposalFormsService.formatToDto(
      await this.proposalFormsService.findOne({ where: { id } }),
    );
  }
}
