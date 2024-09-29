import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { backendServer } from '#src/common/configs/config';

export class GetUserRdo {
  readonly id: number;

  readonly firstname: string;

  readonly surname: string;

  readonly lastname: string;

  readonly birthday: Date;

  readonly role: RolesEntity;

  address?: string;

  city?: string;

  readonly department: DepartmentEntity | string;

  readonly job: JobEntity;

  readonly proposalCount: number;

  readonly telegram?: string;

  readonly vk?: string;

  readonly avatar?: string;

  readonly updatedAt: Date;

  readonly createdAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.surname = user.surname;
    this.lastname = user.lastname;
    this.birthday = user.birthday;
    this.role = user.role;
    this.department = user.department;
    this.job = user.job;
    this.address = user.address;
    this.city = user.city;
    this.telegram = user.telegram;
    this.vk = user.vk;
    this.proposalCount = user.proposalsCount;
    this.avatar = user.avatar?.name
      ? `${backendServer.urlValue}/api/users/assets/avatars/${user.avatar.name}`
      : undefined;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
  }
}
