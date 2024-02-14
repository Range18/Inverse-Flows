import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { UserEntity } from '#src/core/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, UserEntity])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
