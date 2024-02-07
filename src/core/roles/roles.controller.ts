import { Controller, Get } from '@nestjs/common';
import { RolesService } from '#src/core/roles/roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAllRoles() {
    return await this.rolesService.find({});
  }
}
