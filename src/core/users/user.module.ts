import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { RolesEntity } from '#src/core/roles/entity/roles.entity';
import { SessionEntity } from '#src/core/session/session.entity';
import { UserController } from '#src/core/users/user.controller';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { SessionService } from '#src/core/session/session.service';
import { TokenService } from '#src/core/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { DepartmentEntity } from '#src/core/departments/entities/department.entity';
import { DepartmentsModule } from '#src/core/departments/departments.module';
import { ProposalEventEntity } from '#src/core/history/entities/proposal-event.entity';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalEventEntity,
      UserEntity,
      RolesEntity,
      SessionEntity,
      JobEntity,
      DepartmentEntity,
      PrivateCommentEntity,
    ]),
    DepartmentsModule,
  ],
  providers: [SessionService, TokenService, JwtService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
