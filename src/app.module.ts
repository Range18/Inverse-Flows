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

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
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
