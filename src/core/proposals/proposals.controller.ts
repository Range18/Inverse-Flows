import { ApiBody, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { CreateProposalDto } from '#src/core/proposals/dto/create-proposal.dto';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { GetProposalRdo } from '#src/core/proposals/rdo/get-proposal.rdo';
import { FindProposalDto } from '#src/core/proposals/dto/find-proposal.dto';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { FindOptionsWhere } from 'typeorm';

@ApiTags('Proposals')
@Controller('api/proposals')
export class ProposalsController {
  constructor(private readonly proposalService: ProposalsService) {}

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiOkResponse({ type: GetProposalRdo })
  @AuthGuard()
  @Post()
  async create(
    @Body() createProposalDto: CreateProposalDto,
    @User() user: UserRequest,
  ): Promise<GetProposalRdo> {
    return new GetProposalRdo(
      await this.proposalService.create({
        ...createProposalDto,
        author: user.id,
      }),
    );
  }

  @ApiOkResponse({ type: [GetProposalRdo] })
  @ApiBody({
    type: FindProposalDto,
    required: false,
  })
  @Get()
  async findAll(
    @Body() findOptions?: FindProposalDto,
  ): Promise<GetProposalRdo[]> {
    const proposals = findOptions
      ? await this.proposalService.find({
          where: { ...findOptions } as FindOptionsWhere<ProposalsEntity>,
        })
      : await this.proposalService.find({});

    return proposals.map((proposal) => new GetProposalRdo(proposal));
  }

  @ApiOkResponse({ type: GetProposalRdo })
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<GetProposalRdo> {
    return new GetProposalRdo(
      await this.proposalService.findOne({ where: { id } }),
    );
  }

  @ApiOkResponse({ type: [GetProposalRdo] })
  @Get('my')
  async findUserProposals(
    @User() user: UserRequest,
  ): Promise<GetProposalRdo[]> {
    const proposals = await this.proposalService.find({
      where: { author: { id: user.id } },
      relations: ['author', 'category', 'document', 'comments'],
    });

    return proposals.map((proposal) => new GetProposalRdo(proposal));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.proposalService.removeOne({ where: { id } });
  }
}
