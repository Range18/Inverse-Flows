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
import { ProposalEventEntity } from '#src/core/history/entities/proposal-event.entity';
import { ProposalEventModule } from '#src/core/history/proposal-event.module';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalsEntity,
      ProposalEventEntity,
      CategoryEntity,
      PrivateCommentEntity,
    ]),
    UserModule,
    CategoriesModule,
    DocumentsModule,
    SessionModule,
    TokenModule,
    ProposalStatusModule,
    ProposalStatusModule,
    ProposalEventModule,
  ],
  providers: [ProposalsService],
  controllers: [ProposalsController],
  exports: [ProposalsService],
})
export class ProposalsModule {}
