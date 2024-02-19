import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProposalPostsService } from './proposal-posts.service';
import { UpdateProposalPostDto } from './dto/update-proposal-post.dto';
import { User } from '#src/common/decorators/User.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { GetProposalPostRdo } from '#src/core/proposal-posts/rdo/get-proposal-post.rdo';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';

@ApiTags('Proposal Posts')
@Controller('api/proposals/posts')
export class ProposalPostsController {
  private readonly loadRelations = {
    usersLiked: true,
    proposal: {
      author: {
        job: true,
        department: true,
        role: true,
      },
      category: true,
      status: true,
      comments: true,
      document: true,
      history: {
        user: true,
        status: true,
      },
    },
  };

  constructor(private readonly proposalPostsService: ProposalPostsService) {}

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: GetProposalPostRdo })
  @AuthGuard()
  @Post('like/:id')
  async likePost(@Param('id') id: number, @User() user: UserRequest) {
    return new GetProposalPostRdo(
      await this.proposalPostsService.like(id, user.id),
      user.id,
    );
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: [GetProposalPostRdo] })
  @AuthGuard()
  @Get()
  async findAll(@User() user: UserRequest) {
    const posts = await this.proposalPostsService.find({
      relations: this.loadRelations,
    });

    return posts.map((post) => new GetProposalPostRdo(post, user.id));
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: GetProposalPostRdo })
  @AuthGuard()
  @Get(':id')
  async findOne(@Param('id') id: number, @User() user: UserRequest) {
    const post = await this.proposalPostsService.findOne({
      where: { id },
      relations: this.loadRelations,
    });

    await this.proposalPostsService.view(post);

    return new GetProposalPostRdo(post, user.id);
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: GetProposalPostRdo })
  @AuthGuard()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProposalPostDto: UpdateProposalPostDto,
    @User() user: UserRequest,
  ) {
    return new GetProposalPostRdo(
      await this.proposalPostsService.updateOne(
        { where: { id }, relations: this.loadRelations },
        updateProposalPostDto,
      ),
      user.id,
    );
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.proposalPostsService.removeOne({ where: { id } });
  }
}
