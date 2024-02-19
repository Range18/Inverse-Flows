import { UserEntity } from '#src/core/users/user.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { SessionEntity } from '#src/core/session/session.entity';
import { authenticate } from '#src/core/admin-panel/admin-authenticate';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';

export const adminOptions = {
  adminJsOptions: {
    rootPath: '/admin',
    resources: [
      UserEntity,
      JobEntity,
      RolesEntity,
      ProposalsEntity,
      DocumentEntity,
      CategoryEntity,
      SessionEntity,
      DepartmentEntity,
      ProposalStatus,
      PrivateCommentEntity,
      ProposalHistoryEntity,
      ProposalPost,
      AssetEntity,
    ],
  },
  auth: {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'secret',
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
  },
};
