import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { MyBaseEntity } from '#src/common/myBaseEntity';

@Entity('sessions')
export class SessionEntity extends MyBaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  @JoinColumn({ name: 'user' })
  readonly user: UserEntity;

  @Column()
  @Generated('uuid')
  sessionId: string;

  @Column({ nullable: false })
  expireAt: Date;
}
