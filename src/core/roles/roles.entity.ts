import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/user.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
