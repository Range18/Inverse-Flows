import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { UpdateUserDto } from '#src/core/users/dto/update-user.dto';
import { GetMeRdo } from '#src/core/users/rdo/get-me.rdo';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AuthGuard()
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

  @ApiOkResponse({ type: GetMeRdo })
  @AuthGuard()
  @Get('me')
  async getUserMe(@User() user: UserRequest) {
    return new GetMeRdo(
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

  @ApiOkResponse({ type: GetMeRdo })
  @AuthGuard()
  @Patch()
  async update(
    @User() user: UserRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new GetMeRdo(
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
          ...updateUserDto,
          job: { id: updateUserDto.job },
          department: { id: updateUserDto.department },
          role: { id: updateUserDto.role },
        },
        true,
      ),
    );
  }
}
