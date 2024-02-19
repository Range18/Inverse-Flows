import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { backendServer } from '#src/common/configs/config';
import { LoginUserDto } from '#src/core/users/dto/login-user.dto';
import { Cookie } from '#src/common/decorators/cookie.decorator';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: LoggedUserRdo })
  @Post('register')
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() createUserDto: CreateUserDto,
  ): Promise<LoggedUserRdo> {
    const userRdo = await this.authService.register(createUserDto);

    response.cookie('refreshToken', userRdo.refreshToken, {
      expires: userRdo.sessionExpireAt,
      secure: backendServer.secure,
      httpOnly: true,
    });

    return userRdo;
  }

  @ApiOkResponse({ type: LoggedUserRdo })
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoggedUserRdo> {
    const userRdo = await this.authService.login(loginUserDto);

    response.status(200);

    response.cookie('refreshToken', userRdo.refreshToken, {
      expires: userRdo.sessionExpireAt,
      secure: backendServer.secure,
      httpOnly: true,
    });

    return userRdo;
  }

  @Delete('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Cookie('refreshToken') refreshToken: string,
  ): Promise<void> {
    await this.authService.logout(refreshToken);

    response.clearCookie('refreshToken');
  }
}

7;
