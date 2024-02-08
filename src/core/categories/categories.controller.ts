import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoriesService.save(createCategoryDto);
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
