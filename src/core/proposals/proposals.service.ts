import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateProposal } from '#src/core/proposals/dto/create-proposal.dto';
import { UserService } from '#src/core/users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { CategoryService } from '#src/core/categories/category.service';
import { DocumentsService } from '#src/core/documents/documents.service';
import { StatusType } from '#src/core/proposal-status/types/status.type';
import { ProposalStatusService } from '#src/core/proposal-status/proposal-status.service';
import { ProposalHistoryService } from '#src/core/history/proposal-history.service';
import { backendServer } from '#src/common/configs/config';
import { createPostStatuses } from '#src/core/proposals/proposal.constants';
import { ProposalPostsService } from '#src/core/proposal-posts/proposal-posts.service';
import UserExceptions = AllExceptions.UserExceptions;
import CategoryExceptions = AllExceptions.CategoryExceptions;
import ProposalExceptions = AllExceptions.ProposalExceptions;

@Injectable()
export class ProposalsService extends BaseEntityService<ProposalsEntity> {
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
    @InjectRepository(ProposalsEntity)
    private readonly proposalRepository: Repository<ProposalsEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly documentService: DocumentsService,
    private readonly statusService: ProposalStatusService,
    private readonly postService: ProposalPostsService,
    private readonly proposalHistoryService: ProposalHistoryService,
  ) {
    super(proposalRepository);
  }

  async create(createProposalDto: CreateProposal): Promise<ProposalsEntity> {
    const user = await this.userService.findOne({
      where: { id: createProposalDto.author },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const category = await this.categoryService.findOne({
      where: { id: createProposalDto.category },
    });

    if (!category) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'CategoryExceptions',
        CategoryExceptions.CategoryNotFound,
      );
    }

    const inApproveStatus = await this.statusService.findOne({
      where: { name: StatusType.proposalInApprove },
    });

    const proposal = await this.save({
      author: user,
      category: category,
      description: createProposalDto.description,
      name: createProposalDto.name,
      content: JSON.stringify(createProposalDto.content),
      status: inApproveStatus,
    });

    const document = await this.documentService.create(
      proposal,
      createProposalDto.document,
    );

    user.proposalsCount++;
    await this.userService.save(user);

    proposal.documentLink = `${backendServer.urlValue}/api/proposals/documents/file/${document.name}`;

    const createdEvent = await this.proposalHistoryService.save({
      proposal: proposal,
      user: user,
      status: await this.statusService.findOne({
        where: { name: StatusType.proposalCreated },
      }),
    });

    const inApproveEvent = await this.proposalHistoryService.save({
      proposal: proposal,
      user: user,
      status: inApproveStatus,
    });

    proposal.history = [createdEvent, inApproveEvent];

    await this.save(proposal);

    return {
      ...proposal,
      document,
    } as ProposalsEntity;
  }

  async updateProposalStatus(id: number, statusType: string, userId: number) {
    const proposal = await this.findOne({
      where: { id: id },
      relations: {
        author: {
          job: true,
          department: true,
          role: true,
        },
        category: true,
        status: true,
        document: true,
      },
    });

    if (!proposal) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'ProposalExceptions',
        ProposalExceptions.ProposalNotFound,
      );
    }

    const status = await this.statusService.findOne({
      where: { statusType: statusType },
    });

    const history = await this.proposalHistoryService.find({
      where: { proposal: { id: proposal.id } },
      relations: { status: true },
    });

    const isInStatuses =
      history?.length > 0
        ? history?.some((event) => event.status.statusType === statusType)
        : false;

    if (proposal.status?.statusType != statusType && !isInStatuses) {
      proposal.status = status;

      await this.proposalHistoryService.save({
        proposal: { id: proposal.id },
        status: status,
        user: { id: userId },
      });
    }

    const post = await this.postService.findOne({
      where: { proposal: { id: proposal.id } },
    });

    const isCreatePostStatus = createPostStatuses.some(
      (value) => value === statusType,
    );

    if (!post && isCreatePostStatus) {
      await this.postService.save({ proposal: proposal });
    }

    return await this.save(proposal);
  }

  override async removeOne(
    optionsOrEntity: FindOneOptions<ProposalsEntity> | ProposalsEntity,
    throwError = false,
  ): Promise<void> {
    const proposal =
      'where' in <object>optionsOrEntity
        ? await this.findOne(optionsOrEntity as FindOneOptions<ProposalsEntity>)
        : (optionsOrEntity as ProposalsEntity);

    const user = await this.userService.findOne({
      where: { id: proposal.author.id },
    });

    user.proposalsCount--;
    await this.userService.save(user);

    return super.removeOne(proposal, throwError);
  }
}
