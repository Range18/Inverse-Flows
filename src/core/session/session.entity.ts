import {
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

@Entity('sessions')
export class SessionEntity {
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

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @CreateDateColumn()
  readonly createdAt: Date;
}
