import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '#src/common/base.entity';
import { UserEntity } from '#src/core/users/user.entity';

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

  @ManyToMany(() => UserEntity, (user) => user.companies, { nullable: true })
  users?: UserEntity[];
}
