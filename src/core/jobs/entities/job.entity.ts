import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => UserEntity, (user) => user.job)
  users: UserEntity[];
}
