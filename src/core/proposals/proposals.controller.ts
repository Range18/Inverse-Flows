import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { CreateProposalDto } from '#src/core/proposals/dto/create-proposal.dto';
import { AuthGuard } from '#src/common/decorators/guards/authGuard.decorator';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { GetProposalRdo } from '#src/core/proposals/rdo/get-proposal.rdo';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { FindOptionsWhere, In } from 'typeorm';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { UpdateProposalDto } from '#src/core/proposals/dto/update-proposal.dto';
import { RolesGuard } from '#src/common/decorators/guards/roles-guard.decorator';
import { UpdateProposalStatusDto } from '#src/core/proposals/dto/update-proposal-status.dto';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { SetDepartmentDto } from '#src/core/proposals/dto/set-department.dto';
import { ProposalQueryDto } from '#src/core/proposals/dto/proposal-query.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import ProposalExceptions = AllExceptions.ProposalExceptions;

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  private readonly loadRelations: FindOptionsRelations<ProposalsEntity> = {
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

  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @AuthGuard()
  @Post()
  async create(
    @Body() createProposalDto: CreateProposalDto,
    @User() user: UserRequest,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return new GetProposalRdo(
      await this.proposalService.create({
        ...createProposalDto,
        author: user.id,
        files,
      }),
    );
  }

  @AuthGuard()
  @Get()
  async findAll(
    @User() user: UserRequest,
    @Query() query: ProposalQueryDto,
  ): Promise<GetProposalRdo[]> {
    let proposals: ProposalsEntity[];

    const statusTypes = query.status ? query.status.split(',') : [];

    if (!query.limit && !query.offset) {
      proposals = await this.proposalService.find(
        {
          where: {
            status: query.status ? { statusType: In(statusTypes) } : undefined,
            responsibleDepartment: { id: query.responsibleDepartmentId },
          } as FindOptionsWhere<ProposalsEntity>,
          order: { createdAt: query.order },
          relations: {
            ...this.loadRelations,
            post: { reactions: { user: true } },
          },
        },
        true,
      );
    } else {
      proposals = await this.proposalService.find(
        {
          where: {
            status: query.status ? { statusType: In(statusTypes) } : undefined,
            responsibleDepartment: { id: query.responsibleDepartmentId },
          } as FindOptionsWhere<ProposalsEntity>,
          order: { createdAt: query.order },
          skip: query.limit * query.offset - query.offset,
          relations: {
            ...this.loadRelations,
            post: { reactions: { user: true } },
          },
        },
        true,
      );
    }

    return proposals.map((proposal) => new GetProposalRdo(proposal, user.id));
  }

  @AuthGuard()
  @Get('/byId/:id')
  async findOneById(
    @Param('id') id: number,
    @User() user: UserRequest,
  ): Promise<GetProposalRdo> {
    const proposal = await this.proposalService.findOne(
      {
        where: { id },
        relations: {
          ...this.loadRelations,
          post: { reactions: { user: true } },
        },
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

    return new GetProposalRdo(proposal, user.id);
  }

  @ApiQuery({ name: 'status', required: false })
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
        relations: {
          ...this.loadRelations,
          post: { reactions: { user: true } },
        },
      },
      true,
    );

    try {
      return proposals.map((proposal) => new GetProposalRdo(proposal, user.id));
    } catch (err) {
      throw new HttpException(err, 500);
    }
  }

  @ApiQuery({ name: 'id', required: true })
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
        relations: {
          ...this.loadRelations,
          post: { reactions: { user: true } },
        },
      },
      true,
    );

    return await this.proposalService.updateOne(proposal, {
      name: updateProposalDto.name,
      content: updateProposalDto.content,
      category: { id: updateProposalDto.category },
      description: updateProposalDto.description,
      documentLink: updateProposalDto.documentLink,
      dueDate: updateProposalDto.dueDate,
    });
  }

  @ApiQuery({ name: 'id', required: true })
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
      user.id,
    );
  }

  @RolesGuard('moderator', 'admin')
  @AuthGuard()
  @Post(':id/set-department')
  async setResponsibleDepartment(
    @Param('id') id: number,
    @Body() setDepartmentDto: SetDepartmentDto,
  ) {
    return new GetProposalRdo(
      await this.proposalService.updateOne(
        { where: { id }, relations: this.loadRelations },
        { responsibleDepartment: { id: setDepartmentDto.departmentId } },
      ),
    );
  }

  @RolesGuard('moderator', 'admin', 'owner')
  @AuthGuard()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.proposalService.removeOne(
      {
        where: { id },
        relations: { author: true },
      },
      true,
    );

    return 'OK';
  }
}
