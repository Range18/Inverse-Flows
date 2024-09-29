import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserAchievementsRdo } from '#src/core/achievements/rdo/get-user-achievements.rdo';
import { type Response } from 'express';

@ApiTags('User Achievements')
@Controller('users/achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @ApiOkResponse({ type: [GetUserAchievementsRdo] })
  @Get()
  async findAllForUser(@Query('user') userId: number) {
    return await this.achievementsService.getUserAchievements(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.achievementsService.findOne({ where: { id } }, true);
  }

  @Get('/file/:id')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: number,
  ) {
    res.setHeader('Content-Type', 'image/png');

    return await this.achievementsService.getFile(id);
  }
}
