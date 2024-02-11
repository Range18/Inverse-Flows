import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { BaseEntity } from '#src/common/base.entity';

@Entity('roles')
export class RolesEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
