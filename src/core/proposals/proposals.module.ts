import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { ProposalsController } from '#src/core/proposals/proposals.controller';
import { UserModule } from '#src/core/users/user.module';
import { CategoriesModule } from '#src/core/categories/categories.module';
import { DocumentsModule } from '#src/core/documents/documents.module';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { SessionModule } from '#src/core/session/session.module';
import { TokenModule } from '#src/core/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProposalsEntity, CategoryEntity, CommentEntity]),
    UserModule,
    CategoriesModule,
    DocumentsModule,
    SessionModule,
    TokenModule,
  ],
  providers: [ProposalsService],
  controllers: [ProposalsController],
  exports: [ProposalsService],
})
export class ProposalsModule {}
