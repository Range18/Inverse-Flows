import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { RolesEntity } from '#src/core/roles/roles.entity';
import { SessionEntity } from '#src/core/session/session.entity';
import { UserController } from '#src/core/users/user.controller';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RolesEntity, SessionEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
