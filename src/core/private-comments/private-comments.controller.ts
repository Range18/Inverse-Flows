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
import { PrivateCommentsService } from './private-comments.service';
import { CreatePrivateCommentDto } from './dto/create-private-comment.dto';
import { UpdatePrivateCommentDto } from './dto/update-private-comment.dto';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetPrivateCommentRdo } from '#src/core/private-comments/rdo/get-private-comment.rdo';
import { RolesGuard } from '#src/common/decorators/guards/roles-guard.decorator';
import { ProposalsService } from '#src/core/proposals/proposals.service';

@ApiTags('Proposals private comments')
@Controller('api/proposals/comments/private')
export class PrivateCommentsController {
  constructor(
    private readonly commentsService: PrivateCommentsService,
    private readonly proposalsService: ProposalsService,
  ) {}

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: GetPrivateCommentRdo })
  @RolesGuard('moderator', 'admin', 'owner')
  @AuthGuard()
  @Post()
  async create(
    @Body() createCommentDto: CreatePrivateCommentDto,
    @User() user: UserRequest,
  ) {
    return new GetPrivateCommentRdo(
      await this.proposalsService.addComment(createCommentDto, user),
    );
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: [GetPrivateCommentRdo] })
  @ApiQuery({ name: 'proposalId', type: Number })
  @AuthGuard()
  @Get()
  async findAllForProposal(
    @Query('proposalId') id: number,
    @User() user: UserRequest,
  ) {
    const comments = await this.commentsService.find({
      where: { proposal: { id } },
      relations: { user: { avatar: true } },
    });

    return comments.map((comment) => new GetPrivateCommentRdo(comment));
  }

  @ApiHeader({
    name: 'Authorization',
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
        relations: { user: { avatar: true } },
      }),
    );
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiCreatedResponse({ type: GetPrivateCommentRdo })
  @AuthGuard()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdatePrivateCommentDto,
  ) {
    return await this.commentsService.updateOne(
      { where: { id } },
      updateCommentDto,
    );
  }

  @ApiHeader({
    name: 'Authorization',
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
