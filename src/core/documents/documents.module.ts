import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { DepartmentsModule } from '#src/core/departments/departments.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity]), DepartmentsModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
