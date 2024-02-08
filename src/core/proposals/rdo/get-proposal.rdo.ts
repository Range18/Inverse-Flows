import { Category } from '#src/core/categories/entities/category.entity';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ProposalsEntity } from '#src/core/proposals/proposals.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetDocumentRdo } from '#src/core/documents/rdo/get-document.rdo';

export class GetProposalRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly author: GetUserRdo;

  @ApiProperty({ type: () => Category })
  readonly category: Category;

  @ApiProperty()
  readonly content: { [key: string]: any };

  @ApiProperty()
  readonly document: GetDocumentRdo;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(proposal: ProposalsEntity) {
    this.id = proposal.id;
    this.name = proposal.name;
    this.author = new GetUserRdo(proposal.author);
    this.category = proposal.category;
    this.content = JSON.parse(proposal.content);
    this.document = new GetDocumentRdo(proposal.document);
    this.createdAt = proposal.createdAt;
    this.updatedAt = proposal.updatedAt;
  }
}
