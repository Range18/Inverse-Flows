import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '#src/core/jobs/entities/job.entity';
import { UserEntity } from '#src/core/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity, UserEntity])],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
