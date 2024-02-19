import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { CreateProposalDto } from '#src/core/proposals/dto/create-proposal.dto';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { GetProposalRdo } from '#src/core/proposals/rdo/get-proposal.rdo';
import { FindProposalDto } from '#src/core/proposals/dto/find-proposal.dto';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { FindOptionsWhere } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { UpdateProposalDto } from '#src/core/proposals/dto/update-proposal.dto';
import { ProposalHistoryService } from '#src/core/history/proposal-history.service';
import Queries = AllExceptions.Queries;
import PermissionExceptions = AllExceptions.PermissionExceptions;
import ProposalExceptions = AllExceptions.ProposalExceptions;

@ApiTags('Proposals')
@Controller('api/proposals')
export class ProposalsController {
  private readonly loadRelations = {
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
  };

  constructor(
    private readonly proposalService: ProposalsService,
    private readonly proposalEventService: ProposalHistoryService,
  ) {}

  @ApiHeader({
    name: 'authorization',
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
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'status', required: false })
  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('status') status?: number,
    @Body() findOptions?: FindProposalDto,
  ): Promise<GetProposalRdo[]> {
    let proposals: ProposalsEntity[];

    if (!limit && !offset) {
      proposals = findOptions
        ? await this.proposalService.find({
            where: {
              ...findOptions,
              status: { id: status },
            } as FindOptionsWhere<ProposalsEntity>,
            order: findOptions.order,
            relations: this.loadRelations,
          })
        : await this.proposalService.find({
            order: findOptions.order,
            relations: this.loadRelations,
          });
    } else {
      if (limit * offset - offset < 0) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Queries',
          Queries.InvalidLimitOffset,
        );
      }

      proposals = findOptions
        ? await this.proposalService.find({
            where: {
              ...findOptions,
              status: { id: status },
            } as FindOptionsWhere<ProposalsEntity>,
            order: findOptions.order,
            skip: limit * offset - offset,
            relations: this.loadRelations,
          })
        : await this.proposalService.find({
            order: findOptions.order,
            skip: limit * offset - offset,
            relations: this.loadRelations,
          });
    }
    return proposals.map((proposal) => new GetProposalRdo(proposal));
  }

  @ApiOkResponse({ type: GetProposalRdo })
  @Get('/byId/:id')
  async findOneById(@Param('id') id: number): Promise<GetProposalRdo> {
    const proposal = await this.proposalService.findOne({
      where: { id },
      relations: this.loadRelations,
    });

    if (!proposal) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'ProposalExceptions',
        ProposalExceptions.ProposalNotFound,
      );
    }

    return new GetProposalRdo(proposal);
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiQuery({ name: 'status', required: false })
  @ApiOkResponse({ type: [GetProposalRdo] })
  @AuthGuard()
  @Get('my')
  async findUserProposals(
    @User() user: UserRequest,
    @Query('status') statusId?: number,
  ): Promise<GetProposalRdo[]> {
    const proposals = await this.proposalService.find({
      where: {
        author: { id: user.id },
        status: statusId ? { id: statusId } : undefined,
      },
      relations: this.loadRelations,
    });

    return proposals.map((proposal) => new GetProposalRdo(proposal));
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiQuery({ name: 'id', required: true })
  @ApiOkResponse({ type: [GetProposalRdo] })
  @AuthGuard()
  @Patch()
  async patchProposal(
    @Body() updateProposalDto: UpdateProposalDto,
    @User() user: UserRequest,
    @Query('id') id: number,
  ) {
    const proposal = await this.proposalService.findOne({
      where: { id },
      relations: ['author', 'category', 'status'],
    });

    if (proposal.author.id != user.id) {
      throw new ApiException(
        HttpStatus.FORBIDDEN,
        'PermissionExceptions',
        PermissionExceptions.NotTheSameUser,
      );
    }

    if (
      updateProposalDto.status &&
      updateProposalDto.status != proposal.status.id
    ) {
      await this.proposalEventService.save({
        proposal: proposal,
        status: { id: updateProposalDto.status },
        user: { id: user.id },
      });
    }

    return await this.proposalService.updateOne(proposal, {
      name: updateProposalDto.name,
      content: updateProposalDto.content,
      status: { id: updateProposalDto.status },
      category: { id: updateProposalDto.category },
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.proposalService.removeOne({ where: { id } });
  }
}
