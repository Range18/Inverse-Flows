import { UserEntity } from '#src/core/users/user.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FindProposalDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly author: Omit<
    UserEntity,
    'proposals' | 'password' | 'updatedAt' | 'createdAt'
  >;

  @ApiProperty()
  readonly category: Pick<CategoryEntity, 'id' | 'name'>;

  @ApiProperty()
  readonly document: Pick<DocumentEntity, 'name' | 'id'>;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
