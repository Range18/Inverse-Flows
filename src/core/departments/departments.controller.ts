import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  async findAll() {
    return await this.departmentsService.find({}, true);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.departmentsService.findOne({ where: { id } }, true);
  }
}
