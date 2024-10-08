import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { ProposalsController } from '#src/core/proposals/proposals.controller';
import { UserModule } from '#src/core/users/user.module';
import { CategoriesModule } from '#src/core/categories/categories.module';
import { DocumentsModule } from '#src/core/documents/documents.module';
import { SessionModule } from '#src/core/session/session.module';
import { TokenModule } from '#src/core/token/token.module';
import { ProposalStatusModule } from '#src/core/proposal-status/proposal-status.module';
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { ProposalHistoryModule } from '#src/core/history/proposal-history.module';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { DepartmentsModule } from '#src/core/departments/departments.module';
import { ProposalPostsModule } from '#src/core/proposal-posts/proposal-posts.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '#src/core/proposals/multer-config.service';
import { ProposalAssetsModule } from '#src/core/proposal-assets/proposal-assets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalsEntity,
      ProposalHistoryEntity,
      CategoryEntity,
      ProposalPost,
      DepartmentEntity,
    ]),
    UserModule,
    CategoriesModule,
    DocumentsModule,
    SessionModule,
    TokenModule,
    ProposalStatusModule,
    ProposalHistoryModule,
    DepartmentsModule,
    ProposalPostsModule,
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    ProposalAssetsModule,
  ],
  providers: [ProposalsService],
  controllers: [ProposalsController],
  exports: [ProposalsService],
})
export class ProposalsModule {}
