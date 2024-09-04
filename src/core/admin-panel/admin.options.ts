import { UserEntity } from '#src/core/users/entity/user.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { SessionEntity } from '#src/core/session/session.entity';
import { authenticate } from '#src/core/admin-panel/admin-authenticate';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { AchievementEntity } from '#src/core/achievements/entities/achievement.entity';
import { Company } from '#src/core/companies/entities/company.entity';
import { ProposalFormEntity } from '#src/core/proposal-forms/entities/proposal-form.entity';
import { ProposalFieldEntity } from '#src/core/proposal-fields/entities/proposal-field.entity';
import { FieldAnswerEntity } from '#src/core/field-answers/entities/field-answer.entity';

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
      ProposalHistoryEntity,
      ProposalPost,
      AssetEntity,
      CommentEntity,
      AchievementEntity,
      Company,
      ProposalFormEntity,
      ProposalFieldEntity,
      FieldAnswerEntity,
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
