import { Controller, Get, Param } from '@nestjs/common';
import { ProposalFieldsService } from './proposal-fields.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposal fields')
@Controller('form/:formId/proposal-fields')
export class ProposalFieldsController {
  constructor(private readonly proposalFieldsService: ProposalFieldsService) {}

  @Get()
  async findAll(@Param('formId') formId: number) {
    return this.proposalFieldsService.find({
      where: { form: { id: formId } },
      relations: { form: true },
    });
  }

  @Get(':id')
  async findOne(@Param('formId') formId: number, @Param('id') id: number) {
    return this.proposalFieldsService.findOne({
      where: { id, form: { id: formId } },
      relations: { form: true },
    });
  }
}
