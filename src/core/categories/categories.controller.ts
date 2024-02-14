import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';

@ApiTags('Categories')
@Controller('api/proposals/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) {}

  @ApiCreatedResponse({ type: CategoryEntity })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.save(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoriesService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.categoriesService.findOne({ where: { id } });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.categoriesService.removeOne({ where: { id } });
  }
}
