import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { UserService } from '../users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { SessionService } from '../session/session.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { passwordSaltRounds } from '#src/common/configs/config';
import { TokenService } from '#src/core/token/token.service';
import { TokenPayload } from '#src/core/session/types/user.payload';
import bcrypt from 'bcrypt';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import SessionExceptions = AllExceptions.SessionExceptions;
import AuthExceptions = AllExceptions.AuthExceptions;
import UserExceptions = AllExceptions.UserExceptions;
import { RolesService } from '#src/core/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly rolesService: RolesService,
    private readonly tokenService: TokenService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<LoggedUserRdo> {
    const user =
      (await this.userService.findOne({
        where: { email: createUserDto.email },
      })) ??
      (await this.userService.findOne({
        where: { phone: createUserDto.phone },
      }));

    if (user) {
      throw new ApiException(
        HttpStatus.CONFLICT,
        'UserExceptions',
        UserExceptions.UserAlreadyExists,
      );
    }

    const userEntity = await this.userService.save({
      firstname: createUserDto.name,
      surname: createUserDto.surname,
      patronymic: createUserDto.patronymic,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, passwordSaltRounds),
      birthday: createUserDto.birthday,
      vk: createUserDto.vk,
      telegram: createUserDto.telegram,
      phone: createUserDto.phone,
      role: await this.rolesService.findOne({
        where: { name: createUserDto.role },
      }),
    });

    const session = await this.sessionService.createSession({
      userId: userEntity.id,
    });

    return new LoggedUserRdo(
      session.refreshToken,
      session.accessToken,
      session.sessionExpireAt,
      userEntity.email,
    );
  }

  async login(loginUserDto: LoginUserDto): Promise<LoggedUserRdo> {
    const user =
      (await this.userService.findOne({
        where: { email: loginUserDto.login },
      })) ??
      (await this.userService.findOne({
        where: { phone: loginUserDto.login },
      }));

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const comparedPasswords = await bcrypt.compare(
      user.password,
      loginUserDto.password,
    );

    if (!comparedPasswords) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'AuthExceptions',
        AuthExceptions.WrongPassword,
      );
    }
    const session = await this.sessionService.createSession({
      userId: user.id,
    });

    return new LoggedUserRdo(
      session.refreshToken,
      session.accessToken,
      session.sessionExpireAt,
      user.email,
    );
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'SessionExceptions',
        SessionExceptions.SessionNotFound,
      );
    }

    const tokenPayload = await this.tokenService.verifyAsync<TokenPayload>(
      refreshToken,
    );
    await this.sessionService.removeOne({
      where: { sessionId: tokenPayload.sessionId },
    });
  }
}
