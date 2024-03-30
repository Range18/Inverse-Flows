import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserAchievementsRdo } from '#src/core/achievements/rdo/get-user-achievements.rdo';
import { type Response } from 'express';

@ApiTags('User Achievements')
@Controller('api/users/achievements')
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

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ) {
    return await this.achievementsService.updateOne(
      { where: { id } },
      updateAchievementDto,
      true,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.achievementsService.remove({ where: { id } }, true);
  }
}
