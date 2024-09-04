import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '#src/core/users/entity/user.entity';

@Entity('achievements')
export class AchievementEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  cover: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  points: number;

  @Column({ nullable: false })
  totalProgress: number;

  @ManyToMany(() => UserEntity, (user) => user.achievements, { nullable: true })
  @JoinTable({
    joinColumn: { name: 'achievement', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user', referencedColumnName: 'id' },
  })
  usersDone?: UserEntity[];
}
