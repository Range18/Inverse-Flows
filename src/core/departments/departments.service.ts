import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';

@Injectable()
export class DepartmentsService extends BaseEntityService<DepartmentEntity> {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {
    super(departmentRepository);
  }
}
