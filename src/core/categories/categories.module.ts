import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProposalsEntity])],
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
