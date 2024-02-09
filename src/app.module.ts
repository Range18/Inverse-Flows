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
import { JobEntity } from './core/jobs/entities/job.entity';
import { UserEntity } from '#src/core/users/user.entity';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { SessionEntity } from '#src/core/session/session.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { CategoryEntity } from '#src/core/categories/entities/category.entity';
import { authenticate } from '#src/core/admin-panel/admin-authenticate';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ProposalsModule,
    AdminModule.createAdminAsync({
      useFactory: async () => {
        AdminJS.registerAdapter({
          Database,
          Resource,
        });

        return {
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              UserEntity,
              JobEntity,
              RolesEntity,
              ProposalsEntity,
              DocumentEntity,
              CategoryEntity,
              SessionEntity,
            ],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
