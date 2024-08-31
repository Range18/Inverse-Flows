import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { UpdateUserDto } from '#src/core/users/dto/update-user.dto';
import { RolesService } from '#src/core/roles/roles.service';
import { DepartmentsService } from '#src/core/departments/departments.service';
import { JobsService } from '#src/core/jobs/jobs.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RolesService,
    private readonly departmentsService: DepartmentsService,
    private readonly jobService: JobsService,
  ) {}

  @ApiOkResponse({ type: [GetUserRdo] })
  @Get()
  async getAllUsers() {
    const users = await this.userService.find(
      {
        relations: {
          department: true,
          job: true,
          role: true,
          avatar: true,
          company: true,
        },
      },
      true,
    );

    return users.map((user) => new GetUserRdo(user));
  }

  @ApiOkResponse({ type: GetUserRdo })
  @Get('/byId/:id')
  async getUser(@Param('id') id: number) {
    return new GetUserRdo(
      await this.userService.findOne(
        {
          where: { id },
          relations: {
            department: true,
            job: true,
            role: true,
            avatar: true,
            company: true,
          },
        },
        true,
      ),
    );
  }

  @ApiOkResponse({ type: GetUserRdo })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @AuthGuard()
  @Get('me')
  async getUserMe(@User() user: UserRequest) {
    return new GetUserRdo(
      await this.userService.findOne(
        {
          where: { id: user.id },
          relations: {
            department: true,
            job: true,
            role: true,
            avatar: true,
            company: true,
          },
        },
        true,
      ),
    );
  }

  @ApiOkResponse({ type: GetUserRdo })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @AuthGuard()
  @Patch()
  async update(
    @User() user: UserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new GetUserRdo(
      await this.userService.updateOne(
        {
          where: { id: user.id },
          relations: {
            department: true,
            job: true,
            role: true,
            avatar: true,
            company: true,
          },
        },
        {
          email: updateUserDto.email,
          firstname: updateUserDto.firstname,
          surname: updateUserDto.surname,
          lastname: updateUserDto.lastname,
          vk: updateUserDto.vk,
          telegram: updateUserDto.telegram,
          birthday: updateUserDto.birthday,
          phone: updateUserDto.phone,
          job: { id: updateUserDto.job },
          department: { id: updateUserDto.department },
          role: { id: updateUserDto.role },
          password: updateUserDto.password,
        },
        true,
      ),
    );
  }
}
