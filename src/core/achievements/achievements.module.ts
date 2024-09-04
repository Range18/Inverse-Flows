import { Module, OnModuleInit } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementEntity } from '#src/core/achievements/entities/achievement.entity';
import { UserEntity } from '#src/core/users/entity/user.entity';
import { achievementsArray } from '#src/core/achievements/achievements.constants';
import { UserModule } from '#src/core/users/user.module';
import { ProposalPostsModule } from '#src/core/proposal-posts/proposal-posts.module';
import { ProposalHistoryModule } from '#src/core/history/proposal-history.module';
import { ProposalsModule } from '#src/core/proposals/proposals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AchievementEntity, UserEntity]),
    UserModule,
    ProposalPostsModule,
    ProposalHistoryModule,
    ProposalsModule,
  ],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule implements OnModuleInit {
  constructor(private readonly achievementsService: AchievementsService) {}

  async onModuleInit() {
    const achievements = await this.achievementsService.find({});
    if (achievements.length === 0) {
      for (const achievement of achievementsArray) {
        await this.achievementsService.save(achievement);
      }
    }
  }
}
