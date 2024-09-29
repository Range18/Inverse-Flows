import { Controller, Get, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCompanyRdo } from '#src/core/companies/rdo/get-company.rdo';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOkResponse({ type: GetCompanyRdo })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new GetCompanyRdo(
      await this.companiesService.findOne({ where: { id } }, true),
    );
  }

  @ApiOkResponse({ type: GetCompanyRdo })
  @Get('/forms/:id')
  async getCompanyByFormId(@Param('id') id: string) {
    return new GetCompanyRdo(
      await this.companiesService.findOne({ where: { formId: id } }, true),
    );
  }
}
