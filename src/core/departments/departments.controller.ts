import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from '#src/core/departments/dto/create-department.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Departments')
@Controller('api/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentsService.save(createDepartmentDto);
  }

  @Get()
  async findAll() {
    return await this.departmentsService.find({}, true);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.departmentsService.findOne({ where: { id } }, true);
  }

  //TODO
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await this.departmentsService.updateOne(
      { where: { id } },
      updateDepartmentDto,
      true,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.departmentsService.remove({ where: { id } }, true);
  }
}
