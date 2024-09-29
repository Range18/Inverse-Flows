import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '#src/common/configs/database.config';
import { UserModule } from '#src/core/users/user.module';
import { AuthModule } from '#src/core/auth/auth.module';
import { RolesModule } from '#src/core/roles/roles.module';
import { CategoriesModule } from '#src/core/categories/categories.module';
import { ProposalsModule } from '#src/core/proposals/proposals.module';
import { adminOptions } from '#src/core/admin-panel/admin.options';
import { JobsModule } from '#src/core/jobs/jobs.module';
import { ProposalPostsModule } from '#src/core/proposal-posts/proposal-posts.module';
import { AssetsModule } from '#src/core/assets/assets.module';
import { AchievementsModule } from '#src/core/achievements/achievements.module';
import { CommentsModule } from '#src/core/comments/comments.module';
import { CompaniesModule } from '#src/core/companies/companies.module';
import { ProposalFormsModule } from '#src/core/proposal-forms/proposal-forms.module';
import { ProposalFieldsModule } from '#src/core/proposal-fields/proposal-fields.module';
import { FieldAnswersModule } from '#src/core/field-answers/field-answers.module';
import { ProposalAssetsModule } from '#src/core/proposal-assets/proposal-assets.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        AdminJS.registerAdapter({
          Database,
          Resource,
        });
        return adminOptions;
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UserModule,
    AssetsModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ProposalsModule,
    JobsModule,
    ProposalPostsModule,
    AchievementsModule,
    CommentsModule,
    CompaniesModule,
    ProposalFormsModule,
    ProposalFieldsModule,
    FieldAnswersModule,
    ProposalAssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
