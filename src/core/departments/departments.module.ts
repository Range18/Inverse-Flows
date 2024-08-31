import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity, UserEntity, ProposalsEntity]),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
