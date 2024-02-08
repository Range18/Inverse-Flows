import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: [GetUserRdo] })
  @Get()
  async getAllUsers() {
    const users = await this.userService.find({});

    return users.map((user) => new GetUserRdo(user));
  }

  @ApiOkResponse({ type: GetUserRdo })
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return new GetUserRdo(await this.userService.findOne({ where: { id } }));
  }
}
