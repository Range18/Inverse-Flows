import { Module } from '@nestjs/common';
import { ProposalPostsService } from './proposal-posts.service';
import { ProposalPostsController } from './proposal-posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { UserModule } from '#src/core/users/user.module';
import { SessionModule } from '#src/core/session/session.module';
import { TokenModule } from '#src/core/token/token.module';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { LikeEntity } from '#src/core/proposal-posts/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalPost,
      ProposalsEntity,
      UserEntity,
      LikeEntity,
    ]),
    UserModule,
    SessionModule,
    TokenModule,
    CommentEntity,
  ],
  controllers: [ProposalPostsController],
  providers: [ProposalPostsService],
  exports: [ProposalPostsService],
})
export class ProposalPostsModule {}
