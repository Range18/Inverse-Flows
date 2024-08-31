import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { ApiTags } from '@nestjs/swagger';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';

@ApiTags('User Avatars')
@Controller('users/assets/avatars')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @AuthGuard()
  @Post()
  async upload(
    @User() user: UserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.assetsService.upload(user.id, file);
  }

  @Get(':name')
  async getFileByName(
    @Res({ passthrough: true }) res: Response,
    @Param('name') name: string,
  ) {
    const { streamableFile, mimetype } = await this.assetsService.getFileByName(
      name,
    );

    res.setHeader('Content-Type', mimetype);

    return streamableFile;
  }

  @Get('/byUserId/:id')
  async getFileByUserId(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: number,
  ) {
    const { streamableFile, mimetype } = await this.assetsService.getFile(id);

    res.setHeader('Content-Type', mimetype);

    return streamableFile;
  }

  @AuthGuard()
  @Delete()
  async remove(@User() user: UserRequest) {
    return await this.assetsService.delete(user.id);
  }
}
