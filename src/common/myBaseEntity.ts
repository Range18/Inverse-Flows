import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class MyBaseEntity extends BaseEntity {
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
