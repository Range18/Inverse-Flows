import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostReactionEntity } from '#src/core/post-reactions/entities/post-reaction.entity';
import { PostReactionsService } from '#src/core/post-reactions/post-reactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostReactionEntity])],
  controllers: [],
  providers: [PostReactionsService],
  exports: [PostReactionsService],
})
export class PostReactionsModule {}
