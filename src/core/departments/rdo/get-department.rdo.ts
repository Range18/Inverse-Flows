import { DepartmentEntity } from '#src/core/departments/entities/department.entity';

export class GetDepartmentRdo {
  readonly id: number;

  readonly name: string;

  readonly description: string;

  constructor(department: DepartmentEntity) {
    this.id = department.id;
    this.name = department.name;
    this.description = department.description;
  }
}
