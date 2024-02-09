import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '#src/core/users/user.entity';
import { GetProposalRdo } from '#src/core/proposals/rdo/get-proposal.rdo';
import { MyBaseEntity } from '#src/common/myBaseEntity';

@Entity('categories')
export class CategoryEntity extends MyBaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => ProposalsEntity, (proposal) => proposal.category)
  proposal: ProposalsEntity[];
}
