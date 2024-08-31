import { Controller, Get, Param } from '@nestjs/common';
import { FieldAnswersService } from './field-answers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Field answers')
@Controller('fields/:fieldId/answers')
export class FieldAnswersController {
  constructor(private readonly fieldAnswersService: FieldAnswersService) {}

  @Get()
  async findAll(@Param('fieldId') fieldId: number) {
    return await this.fieldAnswersService.find({
      where: { field: { id: fieldId } },
      relations: { field: true },
    });
  }

  @Get(':id')
  async findOne(@Param('fieldId') fieldId: number, @Param('id') id: number) {
    return await this.fieldAnswersService.findOne({
      where: { id, field: { id: fieldId } },
      relations: { field: true },
    });
  }
}
