import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { UserService } from '../users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { SessionService } from '../session/session.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { TokenService } from '#src/core/token/token.service';
import { TokenPayload } from '#src/core/session/types/user.payload';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { RolesService } from '#src/core/roles/roles.service';
import { DepartmentsService } from '#src/core/departments/departments.service';
import SessionExceptions = AllExceptions.SessionExceptions;
import AuthExceptions = AllExceptions.AuthExceptions;
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly rolesService: RolesService,
    private readonly tokenService: TokenService,
    private readonly departmentService: DepartmentsService,
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
      firstname: createUserDto.firstname,
      surname: createUserDto.surname,
      lastname: createUserDto.lastname,
      email: createUserDto.email,
      //TODO Enable
      // password: await bcrypt.hash(createUserDto.password, passwordSaltRounds),
      password: createUserDto.password,
      birthday: createUserDto.birthday,
      vk: createUserDto.vk,
      telegram: createUserDto.telegram,
      department: await this.departmentService.findOne({
        where: { id: createUserDto.department },
      }),
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

    //TODO Enable
    // const comparedPasswords = await bcrypt.compare(
    //   loginUserDto.password,
    //   user.password,
    // );

    const comparedPasswords = loginUserDto.password === user.password;

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
