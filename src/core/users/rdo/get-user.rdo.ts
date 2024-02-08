import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly firstname: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly patronymic: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly birthday: Date;

  @ApiProperty({ type: () => RolesEntity })
  readonly role: RolesEntity;

  @ApiProperty()
  readonly telegram?: string;

  @ApiProperty()
  readonly vk?: string;

  @ApiProperty()
  readonly updatedAt: Date;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.surname = user.surname;
    this.patronymic = user.patronymic;
    this.email = user.email;
    this.phone = user.phone;
    this.birthday = user.birthday;
    this.role = user.role;
    this.telegram = user.telegram;
    this.vk = user.vk;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
  }
}
