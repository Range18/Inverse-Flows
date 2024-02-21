import { ApiProperty } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';

export class GetPostCommentRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly user: GetUserRdo;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(comment: CommentEntity) {
    this.id = comment.id;
    this.text = comment.text;
    this.user = new GetUserRdo(comment.user);
    this.createdAt = comment.createdAt;
  }
}
