import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '#src/common/base.entity';
import { Exclude } from 'class-transformer';

@Entity('roles')
export class RolesEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ApiProperty({ uniqueItems: true })
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Exclude()
  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
