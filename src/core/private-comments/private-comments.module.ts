import { Module } from '@nestjs/common';
import { PrivateCommentsService } from './private-comments.service';
import { PrivateCommentsController } from './private-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '#src/core/users/user.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrivateCommentEntity,
      UserEntity,
      ProposalsEntity,
    ]),
  ],
  controllers: [PrivateCommentsController],
  providers: [PrivateCommentsService],
  exports: [PrivateCommentsService],
})
export class PrivateCommentsModule {}
