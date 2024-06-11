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
import { ProposalPostsService } from './proposal-posts.service';
import { UpdateProposalPostDto } from './dto/update-proposal-post.dto';
import { User } from '#src/common/decorators/User.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { GetProposalPostRdo } from '#src/core/proposal-posts/rdo/get-proposal-post.rdo';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';

@ApiTags('Proposal Posts')
@Controller('api/proposals/posts')
export class ProposalPostsController {
  private readonly loadRelations = {
    likeEntities: { user: true },
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

  constructor(private readonly proposalPostsService: ProposalPostsService) {}

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiBody({ schema: { format: 'type: number' } })
  @ApiOkResponse({ type: GetProposalPostRdo })
  @AuthGuard()
  @Post('like/:id')
  async like(
    @Body('type') type: number,
    @Param('id') id: number,
    @User() user: UserRequest,
  ) {
    return new GetProposalPostRdo(
      await this.proposalPostsService.like(id, type, user.id),
      user.id,
    );
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
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
  @Get()
  async findAll(
    @User() user: UserRequest,
    @Query('order') order?: string,
    @Query('by') property?: string,
  ) {
    const posts = await this.proposalPostsService.find(
      {
        order: property && order ? { [property]: order } : undefined,
        relations: this.loadRelations,
      },
      true,
    );

    return posts.map((post) => new GetProposalPostRdo(post, user.id));
  }

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
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

  @ApiHeader({
    name: 'authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
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
        true,
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
    return await this.proposalPostsService.removeOne({ where: { id } }, true);
  }
}
