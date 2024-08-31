import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { backendServer } from '#src/common/configs/config';

export class GetUserRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly firstname: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly lastname: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly birthday: Date;

  @ApiProperty({ type: () => RolesEntity })
  readonly role: RolesEntity;

  address?: string;

  city?: string;

  @ApiProperty({ type: () => DepartmentEntity || String })
  readonly department: DepartmentEntity | string;

  @ApiProperty({ type: () => JobEntity })
  readonly job: JobEntity;

  @ApiProperty()
  readonly proposalCount: number;

  @ApiProperty()
  readonly telegram?: string;

  @ApiProperty()
  readonly vk?: string;

  @ApiProperty()
  readonly avatar?: string;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.surname = user.surname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.phone = user.phone;
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
