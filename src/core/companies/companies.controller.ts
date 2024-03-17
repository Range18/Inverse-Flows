import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCompanyRdo } from '#src/core/companies/rdo/get-company.rdo';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiBody({ type: CreateCompanyDto })
  @ApiCreatedResponse({ type: GetCompanyRdo })
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companiesService.save(createCompanyDto);
  }

  @ApiOkResponse({ type: [GetCompanyRdo] })
  @Get()
  async findAll() {
    return await this.companiesService.find({});
  }

  @ApiOkResponse({ type: GetCompanyRdo })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.companiesService.findOne({ where: { id } });
  }

  @ApiBody({ type: UpdateCompanyDto })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companiesService.updateOne(
      { where: { id } },
      updateCompanyDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.companiesService.removeOne({ where: { id } });
  }
}
