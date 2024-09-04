import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProposalPostsService } from './proposal-posts.service';
import { User } from '#src/common/decorators/User.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { GetProposalPostRdo } from '#src/core/proposal-posts/rdo/get-proposal-post.rdo';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ProposalPost } from '#src/core/proposal-posts/entities/proposal-post.entity';
import { PostReactionsService } from '#src/core/post-reactions/post-reactions.service';
import { GiveReactionDto } from '#src/core/proposal-posts/dto/give-reaction.dto';
import { ProposalPostQuery } from '#src/core/proposal-posts/dto/proposal-post.query';

@ApiTags('Proposal Posts')
@Controller('proposals/posts')
export class ProposalPostsController {
  private readonly loadRelations: FindOptionsRelations<ProposalPost> = {
    reactions: { user: true },
    proposal: {
      author: {
        job: true,
        department: true,
        role: true,
        avatar: true,
      },
      category: true,
      status: true,
      document: true,
      history: {
        user: true,
        status: true,
      },
    },
  };

  constructor(
    private readonly proposalPostsService: ProposalPostsService,
    private readonly postReactionsService: PostReactionsService,
  ) {}

  @ApiOkResponse({ type: GetProposalPostRdo })
  @AuthGuard()
  @Post('like/:id')
  async like(
    @Body() { type }: GiveReactionDto,
    @Param('id') id: number,
    @User() user: UserRequest,
  ) {
    return new GetProposalPostRdo(
      await this.proposalPostsService.like(id, type, user.id),
      user.id,
    );
  }

  @AuthGuard()
  @Get()
  async findAll(@User() user: UserRequest, @Query() query: ProposalPostQuery) {
    const posts = await this.proposalPostsService.find(
      {
        where: { proposal: { author: { id: query.userId } } },
        order:
          query.by && query.order ? { [query.by]: query.order } : undefined,
        relations: this.loadRelations,
      },
      true,
    );

    return posts.map((post) => new GetProposalPostRdo(post, user.id));
  }

  @ApiOkResponse({ type: GetProposalPostRdo })
  @AuthGuard()
  @Get('/byId/:id')
  async findOne(@Param('id') id: number, @User() user: UserRequest) {
    const post = await this.proposalPostsService.findOne(
      {
        where: { id },
        relations: this.loadRelations,
      },
      true,
    );

    await this.proposalPostsService.view(post);

    return new GetProposalPostRdo(post, user.id);
  }

  @ApiOkResponse({ type: [GetProposalPostRdo] })
  @ApiQuery({
    name: 'by',
    type: String,
    description: 'Ключ, по которому будем сортировать',
  })
  @ApiQuery({
    name: 'order',
    type: String,
    description: 'Как сортировать: ASC - по возврастанию, DESC - по убыванию',
  })
  @AuthGuard()
  @Get('/my')
  async findAllForUser(
    @User() user: UserRequest,
    @Query('order') order?: string,
    @Query('by') property?: string,
  ) {
    const posts = await this.proposalPostsService.find(
      {
        where: { proposal: { author: { id: user.id } } },
        order: property && order ? { [property]: order } : undefined,
        relations: this.loadRelations,
      },
      true,
    );

    return posts.map((post) => new GetProposalPostRdo(post, user.id));
  }

  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.proposalPostsService.removeOne({ where: { id } }, true);
  }
}
