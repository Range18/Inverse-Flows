import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { ApiProperty } from '@nestjs/swagger';
import { GetDocumentRdo } from '#src/core/documents/rdo/get-document.rdo';
import { Content } from '#src/core/proposals/types/content.type';
import { GetHistoryRdo } from '#src/core/history/rdo/get-history.rdo';
import { GetStatusRdo } from '#src/core/proposal-status/rdo/get-status.rdo';
import { UserEntity } from '#src/core/users/user.entity';

export class GetProposalRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly author: GetUserRdo;

  @ApiProperty({ type: () => CategoryEntity })
  readonly category: CategoryEntity;

  @ApiProperty({ type: Content })
  readonly content: Content;

  @ApiProperty({ type: GetStatusRdo })
  readonly status: GetStatusRdo;

  @ApiProperty({ type: GetDocumentRdo, nullable: true })
  readonly document?: GetDocumentRdo;

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
    this.author = new GetUserRdo(this.changeUserForTesting(proposal));
    this.status = new GetStatusRdo(proposal.status);
    this.category = proposal.category;
    this.content = JSON.parse(proposal.content);
    this.description = proposal.description;

    this.document = proposal.document
      ? new GetDocumentRdo(proposal.document)
      : undefined;
    this.documentLink = proposal.documentLink
      ? proposal.documentLink
      : 'Документа нет';

    if (proposal.history?.length != 0) {
      this.history = proposal.history?.map(
        (history) => new GetHistoryRdo(history),
      );
    }

    this.createdAt = proposal.createdAt;
    this.updatedAt = proposal.updatedAt;
  }

  //TODO DELETE
  // Just for testing
  changeUserForTesting(proposal: ProposalsEntity): UserEntity {
    if (proposal.firstname) {
      return {
        ...proposal.author,
        firstname: proposal.firstname,
        surname: proposal.surname,
        lastname: proposal.lastname,
        telegram: proposal.telegram,
        department: proposal.department,
      } as unknown as UserEntity;
    }
    return proposal.author;
  }
}
