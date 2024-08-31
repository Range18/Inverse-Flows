import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { RolesGuard } from '#src/common/decorators/guards/roles-guard.decorator';
import { CreateCommentDto } from '#src/core/comments/dto/create-comment.dto';
import { GetPostCommentRdo } from '#src/core/comments/rdo/get-post-comment.rdo';
import { User } from '#src/common/decorators/User.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';

@ApiTags('Post Comments')
@Controller('proposals/posts/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: GetPostCommentRdo })
  @RolesGuard('moderator', 'admin', 'owner')
  @AuthGuard()
  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @User() user: UserRequest,
  ) {
    return await this.commentsService.create(createCommentDto, user.id);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: [GetPostCommentRdo] })
  @AuthGuard()
  @Get()
  async findAll() {
    return await this.commentsService.find(
      {
        relations: { user: { avatar: true } },
      },
      true,
    );
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: [GetPostCommentRdo] })
  @ApiQuery({ name: 'postId', type: Number })
  @AuthGuard()
  @Get()
  async findAllForPost(@Query('postId') postId: number) {
    const comments = await this.commentsService.find(
      {
        where: { post: { id: postId } },
        relations: { user: { avatar: true } },
      },
      true,
    );

    return comments.map((comment) => new GetPostCommentRdo(comment));
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: GetPostCommentRdo })
  @AuthGuard()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.commentsService.findOne(
      {
        where: { id },
        relations: { user: { avatar: true } },
      },
      true,
    );
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: GetPostCommentRdo })
  @AuthGuard()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @User() user: UserRequest,
  ) {
    return await this.commentsService.updateOne(
      {
        where: { id, user: { id: user.id } },
        relations: { user: { avatar: true } },
      },
      updateCommentDto,
      true,
    );
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: number, @User() user: UserRequest) {
    return await this.commentsService.removeOne(
      {
        where: { id, user: { id: user.id } },
      },
      true,
    );
  }
}
