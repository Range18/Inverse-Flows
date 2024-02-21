import { Module } from '@nestjs/common';
import { PrivateCommentsService } from './private-comments.service';
import { PrivateCommentsController } from './private-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';
import { ProposalsModule } from '#src/core/proposals/proposals.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';
import { UserModule } from '#src/core/users/user.module';
import { ProposalHistoryModule } from '#src/core/history/proposal-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrivateCommentEntity,
      UserEntity,
      ProposalsEntity,
    ]),
    ProposalsModule,
    TokenModule,
    SessionModule,
    UserModule,
    ProposalHistoryModule,
  ],
  controllers: [PrivateCommentsController],
  providers: [PrivateCommentsService],
  exports: [PrivateCommentsService],
})
export class PrivateCommentsModule {}
