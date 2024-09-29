import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('proposals/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get()
  async findAll() {
    return await this.categoriesService.find({}, true);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoriesService.findOne({ where: { id } }, true);
  }
}
