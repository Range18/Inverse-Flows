import { Controller, Get } from '@nestjs/common';
import { UserService } from '#src/core/users/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.find({});
  }
}
