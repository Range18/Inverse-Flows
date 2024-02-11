import { UserEntity } from '#src/core/users/user.entity';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { SessionEntity } from '#src/core/session/session.entity';
import { authenticate } from '#src/core/admin-panel/admin-authenticate';

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
