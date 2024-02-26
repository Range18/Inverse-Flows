import { AchievementEntity } from '#src/core/achievements/entities/achievement.entity';
import { ApiProperty } from '@nestjs/swagger';
import { backendServer } from '#src/common/configs/config';

export class GetUserAchievementsRdo {
  readonly currentProgress: number;

  readonly achievementType: GetAchievementsRdo;

  constructor(currentProgress: number, entity: AchievementEntity) {
    this.currentProgress = currentProgress;
    this.achievementType = new GetAchievementsRdo(entity);
  }
}

export class GetAchievementsRdo {
  @ApiProperty()
  readonly cover: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly points: number;

  @ApiProperty()
  readonly totalProgress: number;

  constructor(entity: AchievementEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.cover = `${backendServer.urlValue}/api/users/achievements/file/${entity.id}`;
    this.points = entity.points;
    this.totalProgress = entity.totalProgress;
  }
}
