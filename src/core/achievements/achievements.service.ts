import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '#src/core/users/user.service';
import { AchievementEntity } from '#src/core/achievements/entities/achievement.entity';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { achievementsArray } from '#src/core/achievements/achievements.constants';
import { GetUserAchievementsRdo } from '#src/core/achievements/rdo/get-user-achievements.rdo';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { createReadStream } from 'fs';
import { join } from 'path';
import { storageConfig } from '#src/common/configs/storage.config';
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class AchievementsService extends BaseEntityService<AchievementEntity> {
  constructor(
    @InjectRepository(AchievementEntity)
    private readonly achievementsRepository: Repository<AchievementEntity>,
    private readonly userService: UserService,
    private readonly proposalsService: ProposalsService,
  ) {
    super(achievementsRepository);
  }

  private async getCountApprovedProposal(userId: number): Promise<number> {
    const proposals = await this.proposalsService.find({
      where: { author: { id: userId } },
      relations: { history: { status: true } },
    });

    if (proposals?.length === 0 || proposals[0]?.author?.id !== userId) {
      return 0;
    }
    let total = 0;
    for (const proposal of proposals) {
      for (const history of proposal.history) {
        if (history.status.statusType === 'proposalApproved') {
          total += 1;
        }
      }
    }

    return total;
  }

  private async getCountOfLikes(userId: number) {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { likedPosts: true },
    });

    const likes = user.likedPosts;

    return likes.length;
  }

  async getUserAchievements(userId: number) {
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: { likedPosts: true, achievements: true },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const achievements = await this.find({});

    const userAchievements = user.achievements.map(
      (entity) => new GetUserAchievementsRdo(entity.totalProgress, entity),
    );

    for (const achievement of achievements) {
      if (
        !user.achievements.some((element) => element.name === achievement.name)
      ) {
        let approvedProposalsCount = null;
        let likesCount = null;

        switch (achievement.name) {
          case achievementsArray[0].name:
            userAchievements.push(new GetUserAchievementsRdo(0, achievement));
            break;

          case achievementsArray[1].name:
            approvedProposalsCount =
              approvedProposalsCount ??
              (await this.getCountApprovedProposal(userId));

            userAchievements.push(
              new GetUserAchievementsRdo(
                approvedProposalsCount ? 1 : 0,
                achievement,
              ),
            );

            break;

          case achievementsArray[2].name:
            likesCount = likesCount ?? (await this.getCountOfLikes(userId));
            userAchievements.push(
              new GetUserAchievementsRdo(
                likesCount >= 10 ? 10 : likesCount,
                achievement,
              ),
            );

            break;

          case achievementsArray[3].name:
            approvedProposalsCount =
              approvedProposalsCount ??
              (await this.getCountApprovedProposal(userId));

            userAchievements.push(
              new GetUserAchievementsRdo(
                approvedProposalsCount ? 1 : 0,
                achievement,
              ),
            );

            break;

          case achievementsArray[4].name:
            userAchievements.push(new GetUserAchievementsRdo(0, achievement));
            break;
        }
      }
    }

    if (userAchievements.length === 0) {
      return achievements.map(
        (entity) => new GetUserAchievementsRdo(0, entity),
      );
    }

    return userAchievements;
  }

  async getFile(idOrName: number): Promise<StreamableFile> {
    const achievement = await this.findOne({ where: { id: idOrName } });

    if (!achievement) {
      throw new HttpException('Achievement not found', HttpStatus.NOT_FOUND);
    }

    const readStream = createReadStream(
      join(storageConfig.path, storageConfig.innerStatic, achievement.cover),
    );

    return new StreamableFile(readStream);
  }
}
