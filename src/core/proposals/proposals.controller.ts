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
  HttpException,
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
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { FindOptionsWhere } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { UpdateProposalDto } from '#src/core/proposals/dto/update-proposal.dto';
import { RolesGuard } from '#src/common/decorators/guards/roles-guard.decorator';
import { UpdateProposalStatusDto } from '#src/core/proposals/dto/update-proposal-status.dto';
import Queries = AllExceptions.Queries;
import ProposalExceptions = AllExceptions.ProposalExceptions;

@ApiTags('Proposals')
@Controller('api/proposals')
export class ProposalsController {
  private readonly loadRelations = {
    author: {
      avatar: true,
      job: true,
      department: true,
      role: true,
    },
    category: true,
    status: true,
    document: true,
    history: {
      user: {
        avatar: true,
      },
      status: true,
    },
  };

  constructor(private readonly proposalService: ProposalsService) {}

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
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'status', required: false })
  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('status') status?: number,
  ): Promise<GetProposalRdo[]> {
    let proposals: ProposalsEntity[];

    if (!limit && !offset) {
      proposals = await this.proposalService.find(
        {
          where: {
            status: status ? { id: status } : undefined,
          } as FindOptionsWhere<ProposalsEntity>,
          order: {},
          relations: this.loadRelations,
        },
        true,
      );
    } else {
      if (limit * offset - offset < 0) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Queries',
          Queries.InvalidLimitOffset,
        );
      }

      proposals = await this.proposalService.find(
        {
          where: {
            status: status ? { id: status } : undefined,
          } as FindOptionsWhere<ProposalsEntity>,
          order: {},
          skip: limit * offset - offset,
          relations: this.loadRelations,
        },
        true,
      );
    }

    return proposals.map((proposal) => new GetProposalRdo(proposal));
  }

  @ApiOkResponse({ type: GetProposalRdo })
  @Get('/byId/:id')
  async findOneById(@Param('id') id: number): Promise<GetProposalRdo> {
    const proposal = await this.proposalService.findOne(
      {
        where: { id },
        relations: this.loadRelations,
      },
      true,
    );

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
  ) {
    const proposals = await this.proposalService.find(
      {
        where: {
          author: { id: user.id },
          status: statusId ? { id: statusId } : undefined,
        },
        relations: this.loadRelations,
      },
      true,
    );

    try {
      return proposals.map((proposal) => new GetProposalRdo(proposal));
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiQuery({ name: 'id', required: true })
  @ApiBody({ type: UpdateProposalDto })
  @ApiOkResponse({ type: GetProposalRdo })
  @RolesGuard('owner')
  @AuthGuard()
  @Patch()
  async patchProposal(
    @Body() updateProposalDto: UpdateProposalDto,
    @User() user: UserRequest,
    @Query('id') id: number,
  ) {
    const proposal = await this.proposalService.findOne(
      {
        where: { id },
        relations: this.loadRelations,
      },
      true,
    );

    return await this.proposalService.updateOne(proposal, {
      name: updateProposalDto.name,
      content: updateProposalDto.content,
      category: { id: updateProposalDto.category },
      description: updateProposalDto.description,
      documentLink: updateProposalDto.documentLink,
    });
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @ApiQuery({ name: 'id', required: true })
  @ApiBody({ type: UpdateProposalStatusDto })
  @ApiOkResponse({ type: [GetProposalRdo] })
  @RolesGuard('member', 'moderator', 'admin')
  @AuthGuard()
  @Patch(':id/process')
  async updateProposalStatus(
    @Param('id') id: number,
    @Body() updateProposalStatusDto: UpdateProposalStatusDto,
    @User() user: UserRequest,
  ) {
    return new GetProposalRdo(
      await this.proposalService.updateProposalStatus(
        id,
        updateProposalStatusDto,
        user.id,
      ),
    );
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: { format: 'Bearer ${AccessToken}' },
  })
  @RolesGuard('moderator', 'admin', 'owner')
  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.proposalService.removeOne(
      {
        where: { id },
        relations: { author: true },
      },
      true,
    );
  }
}
