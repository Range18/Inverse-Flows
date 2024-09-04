import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  inn: string;

  @Column({ nullable: false })
  kpp: string;

  @Column({ nullable: false })
  ogrn: string;

  @Column({ nullable: true })
  address?: string;

  @Generated('uuid')
  @Column({ nullable: true })
  formId: string;

  @OneToMany(() => UserEntity, (user) => user.company, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  users?: UserEntity[];
}
