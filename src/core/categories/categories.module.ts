import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '#src/core/categories/entities/category.entity';
import { ProposalsEntity } from '#src/core/proposals/proposals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, ProposalsEntity])],
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
