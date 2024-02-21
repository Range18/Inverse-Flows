import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetDocumentRdo } from '#src/core/documents/rdo/get-document.rdo';
import { Content } from '#src/core/proposals/types/content.type';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { GetHistoryRdo } from '#src/core/history/rdo/get-history.rdo';

export class GetProposalRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly author: GetUserRdo;

  @ApiProperty({ type: () => CategoryEntity })
  readonly category: CategoryEntity;

  @ApiProperty()
  readonly content: Content;

  @ApiProperty()
  readonly status: ProposalStatus;

  @ApiProperty()
  readonly document: GetDocumentRdo;

  @ApiProperty({ type: [GetHistoryRdo] })
  readonly history: GetHistoryRdo[];

  @ApiProperty()
  readonly documentLink: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(proposal: ProposalsEntity) {
    this.id = proposal.id;
    this.name = proposal.name;
    this.author = new GetUserRdo(proposal.author);
    this.status = proposal.status;
    this.category = proposal.category;
    this.content = JSON.parse(proposal.content);
    this.document = new GetDocumentRdo(proposal.document);
    this.documentLink = proposal.documentLink;
    if (proposal.history?.length != 0) {
      this.history = proposal.history?.map(
        (history) => new GetHistoryRdo(history),
      );
    }

    this.createdAt = proposal.createdAt;
    this.updatedAt = proposal.updatedAt;
  }
}
