import { UserEntity } from '#src/core/users/user.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { ApiProperty } from '@nestjs/swagger';
import type { FindOptionsOrder } from 'typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { GetDocumentRdo } from '#src/core/documents/rdo/get-document.rdo';

export class FindProposalDto {
  @ApiProperty({ nullable: true })
  readonly id?: number;

  @ApiProperty({ nullable: true })
  readonly name?: string;

  @ApiProperty({ type: GetUserRdo, nullable: true })
  readonly author?:
    | Omit<
        UserEntity,
        'proposals' | 'password' | 'updatedAt' | 'createdAt' | 'sessions'
      >
    | undefined;

  // @ApiProperty({ nullable: true })
  // readonly status?: Omit<
  //   ProposalStatus,
  //   'proposals' | 'createdAt' | 'updatedAt'
  // >;

  @ApiProperty({ nullable: true })
  readonly category?: Pick<CategoryEntity, 'id' | 'name'>;

  @ApiProperty({ type: GetDocumentRdo, nullable: true })
  readonly document?: Pick<DocumentEntity, 'name' | 'id'>;

  @ApiProperty({ nullable: true })
  readonly createdAt?: Date;

  @ApiProperty({ nullable: true })
  readonly updatedAt?: Date;

  @ApiProperty({
    nullable: true,
    description:
      'Порядок объектов. Чтобы задать порядок, нужно указать объект вида { *propertyName*: "ASC" | "DESC" }. Пример: order: {id: "ASC" }',
  })
  order?: FindOptionsOrder<ProposalsEntity>;
}
