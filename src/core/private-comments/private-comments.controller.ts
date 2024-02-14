import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PrivateCommentsService } from './private-comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { GetPrivateCommentRdo } from '#src/core/private-comments/rdo/get-private-comment.rdo';

@ApiTags('Private Comments')
@Controller('api/proposals/comments')
export class PrivateCommentsController {
  constructor(private readonly commentsService: PrivateCommentsService) {}

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: GetPrivateCommentRdo })
  @AuthGuard()
  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: UserRequest,
  ) {
    return new GetPrivateCommentRdo(
      await this.commentsService.addComment(createCommentDto, user.id),
    );
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: GetPrivateCommentRdo })
  @AuthGuard()
  @Get(':id')
  async findOne(@Param('id') id: number, @User() user: UserRequest) {
    return new GetPrivateCommentRdo(
      await this.commentsService.findOne({
        where: { id },
        relations: ['user'],
      }),
    );
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: GetPrivateCommentRdo })
  @AuthGuard()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentsService.updateOne(
      { where: { id } },
      updateCommentDto,
    );
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: GetPrivateCommentRdo })
  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.commentsService.removeOne({ where: { id } });
  }
}
