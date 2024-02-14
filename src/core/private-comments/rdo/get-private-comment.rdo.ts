import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';

export class GetPrivateCommentRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly user: GetUserRdo;

  constructor(comment: PrivateCommentEntity) {
    this.id = comment.id;
    this.text = comment.text;
    this.user = new GetUserRdo(comment.user);
  }
}
