import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { UserModule } from '#src/core/users/user.module';
import { ProposalPostsModule } from '#src/core/proposal-posts/proposal-posts.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';
import { ProposalsModule } from '#src/core/proposals/proposals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, ProposalPost, UserEntity]),
    UserModule,
    ProposalPostsModule,
    TokenModule,
    SessionModule,
    ProposalsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
