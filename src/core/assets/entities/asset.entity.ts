import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { storageConfig } from '#src/common/configs/storage.config';

@Entity('assets')
export class AssetEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: storageConfig.defaultMimetype })
  mimetype: string;

  @OneToOne(() => UserEntity, (user) => user.avatar, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
