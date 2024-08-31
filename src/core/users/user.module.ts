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
import { ProposalHistoryEntity } from '#src/core/history/entities/proposal-history.entity';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { AssetEntity } from '#src/core/assets/entities/asset.entity';
import { CommentEntity } from '#src/core/comments/entities/comment.entity';
import { Company } from '#src/core/companies/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalHistoryEntity,
      UserEntity,
      RolesEntity,
      SessionEntity,
      JobEntity,
      DepartmentEntity,
      ProposalPost,
      AssetEntity,
      CommentEntity,
      Company,
    ]),
  ],
  providers: [SessionService, TokenService, JwtService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
