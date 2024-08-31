import { Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { LoggedUserRdo } from '#src/core/users/rdo/logged-user.rdo';
import { SessionService } from '#src/core/session/session.service';
import { Cookie } from '#src/common/decorators/cookie.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('session')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Cookie('refreshToken') refreshToken: string,
  ): Promise<LoggedUserRdo> {
    const newSession = await this.sessionService.refreshSession(refreshToken);

    response.cookie('refreshToken', newSession.refreshToken, {
      expires: newSession.sessionExpireAt,
      secure: true,
      httpOnly: true,
      sameSite: 'none',
    });

    return new LoggedUserRdo(
      newSession.refreshToken,
      newSession.accessToken,
      newSession.sessionExpireAt,
      newSession.email,
    );
  }
}
