import { Module } from '@nestjs/common';
import { ProposalPostsService } from './proposal-posts.service';
import { ProposalPostsController } from './proposal-posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProposalPost, ProposalsEntity])],
  controllers: [ProposalPostsController],
  providers: [ProposalPostsService],
})
export class ProposalPostsModule {}
