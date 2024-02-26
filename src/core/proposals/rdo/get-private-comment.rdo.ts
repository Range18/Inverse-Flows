import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class GetPrivateCommentRdo {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly text: string;

  @ApiProperty()
  readonly user: GetUserRdo;

  @ApiProperty()
  readonly createdAt: Date;
  //TODO
  // constructor(comment: ) {
  //   this.id = comment.id;
  //   this.text = comment.text;
  //   this.user = new GetUserRdo(comment.user);
  //   this.createdAt = comment.createdAt;
  // }
}
