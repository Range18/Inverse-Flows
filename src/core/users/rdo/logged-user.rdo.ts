import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @Exclude()
  readonly refreshToken: string;

  @ApiProperty()
  readonly accessToken: string;

  @Exclude()
  readonly sessionExpireAt: Date;

  @ApiProperty()
  readonly email: string;

  constructor(
    refreshToken: string,
    accessToken: string,
    sessionExpireAt: Date,
    email: string,
  ) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.sessionExpireAt = sessionExpireAt;
    this.email = email;
  }
}
