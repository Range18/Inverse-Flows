import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { GetDocumentRdo } from '#src/core/documents/rdo/get-document.rdo';
import { GetHistoryRdo } from '#src/core/history/rdo/get-history.rdo';
import { GetStatusRdo } from '#src/core/proposal-status/rdo/get-status.rdo';
import { GetProposalPostRdo } from '#src/core/proposal-posts/rdo/get-proposal-post.rdo';
import { GetDepartmentRdo } from '#src/core/departments/rdo/get-department.rdo';

export class GetProposalRdo {
  readonly id: number;

  readonly name: string;

  readonly description: string;

  readonly author: GetUserRdo;

  readonly category: CategoryEntity;

  readonly content: { [key: string]: any };

  readonly status: GetStatusRdo;

  readonly document?: GetDocumentRdo;

  readonly history: GetHistoryRdo[];

  readonly documentLink: string;

  readonly post: GetProposalPostRdo;

  responsibleDepartment?: GetDepartmentRdo;

  dueDate?: Date;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  constructor(proposal: ProposalsEntity, userId?: number) {
    this.id = proposal.id;
    this.name = proposal.name;
    this.author = new GetUserRdo(proposal.author);
    this.status = new GetStatusRdo(proposal.status);
    this.category = proposal.category;
    this.content = JSON.parse(proposal.content);
    this.description = proposal.description;
    this.dueDate = proposal.dueDate;

    this.responsibleDepartment = proposal.responsibleDepartment
      ? new GetDepartmentRdo(proposal.responsibleDepartment)
      : undefined;

    this.document = proposal.document
      ? new GetDocumentRdo(proposal.document)
      : undefined;
    this.documentLink = proposal.documentLink ?? 'Материалов нет';

    if (proposal.history?.length != 0) {
      this.history = proposal.history?.map(
        (history) => new GetHistoryRdo(history),
      );
    }

    this.post = proposal.post
      ? new GetProposalPostRdo(proposal.post, userId)
      : undefined;

    this.createdAt = proposal.createdAt;
    this.updatedAt = proposal.updatedAt;
  }
}
