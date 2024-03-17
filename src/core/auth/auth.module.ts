import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '#src/core/token/token.module';
import { RolesModule } from '#src/core/roles/roles.module';
import { DepartmentsModule } from '#src/core/departments/departments.module';
import { CompaniesModule } from '#src/core/companies/companies.module';

@Module({
  imports: [
    UserModule,
    SessionModule,
    TokenModule,
    RolesModule,
    DepartmentsModule,
    CompaniesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
