import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import { AdminModule } from '@adminjs/nestjs';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '#src/common/configs/database.config';
import { UserModule } from '#src/core/users/user.module';
import { AuthModule } from '#src/core/auth/auth.module';
import { RolesModule } from '#src/core/roles/roles.module';
import { CategoriesModule } from '#src/core/categories/categories.module';
import { ProposalsModule } from '#src/core/proposals/proposals.module';
import { adminOptions } from '#src/core/admin-panel/admin.options';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        AdminJS.registerAdapter({
          Database,
          Resource,
        });
        return adminOptions;
      },
    }),
    UserModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ProposalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
