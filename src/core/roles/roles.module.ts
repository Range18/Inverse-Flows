import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { RolesService } from '#src/core/roles/roles.service';
import { rolesArray } from '#src/core/roles/roles.constants';
import { RolesController } from '#src/core/roles/roles.controller';
import * as console from 'console';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule implements OnModuleInit {
  constructor(private readonly rolesService: RolesService) {}

  async onModuleInit() {
    const roles = await this.rolesService.find({});

    if (roles.length == 0) {
      for (const role of rolesArray) {
        await this.rolesService.save(role);
      }
    }
  }
}
