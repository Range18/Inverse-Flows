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
import { createPostStatuses } from '#src/core/proposals/types/proposal.constants';
import { ProposalPostsService } from '#src/core/proposal-posts/proposal-posts.service';
import { UpdateProposalStatusDto } from '#src/core/proposals/dto/update-proposal-status.dto';
import { ProposalStatus } from '#src/core/proposal-status/entities/proposal-status.entity';
import { DocumentEntity } from '#src/core/documents/entities/document.entity';
import { ProposalAssetsService } from '#src/core/proposal-assets/proposal-assets.service';
import UserExceptions = AllExceptions.UserExceptions;
import ProposalExceptions = AllExceptions.ProposalExceptions;

@Injectable()
export class ProposalsService extends BaseEntityService<ProposalsEntity> {
  constructor(
    @InjectRepository(ProposalsEntity)
    private readonly proposalRepository: Repository<ProposalsEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly documentService: DocumentsService,
    private readonly statusService: ProposalStatusService,
    private readonly postService: ProposalPostsService,
    private readonly proposalHistoryService: ProposalHistoryService,
    private readonly assetsService: ProposalAssetsService,
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

    const inApproveStatus = await this.statusService.findOne({
      where: { name: StatusType.proposalInApprove },
    });

    const proposal = await this.save({
      author: user,
      description: createProposalDto.description,
      name: createProposalDto.name,
      content: JSON.stringify(createProposalDto.content),
      status: inApproveStatus,
    });

    user.proposalsCount++;
    await this.userService.save(user);

    const document: DocumentEntity | undefined =
      createProposalDto.isDocumentGenerated ?? true
        ? await this.documentService.create(
            proposal,
            createProposalDto.document,
          )
        : undefined;

    // createProposalDto.document as generated one or link
    proposal.documentLink = document
      ? `${backendServer.urlValue}/api/proposals/documents/file/${document.name}`
      : createProposalDto.document;

    if (createProposalDto.files) {
      await this.assetsService.uploadFiles(
        createProposalDto.files,
        proposal.id,
      );
    }

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

    await this.postService.save({ proposal: proposal });

    return {
      ...proposal,
      document,
    } as ProposalsEntity;
  }

  async updateProposalStatus(
    id: number,
    updateProposalStatusDto: UpdateProposalStatusDto,
    userId: number,
  ): Promise<ProposalsEntity> {
    const proposal = await this.findOne({
      where: { id: id },
      relations: {
        author: {
          avatar: true,
          job: true,
          department: true,
          role: true,
        },
        category: true,
        status: true,
        document: true,
        post: { reactions: true },
      },
    });

    if (!proposal) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'ProposalExceptions',
        ProposalExceptions.ProposalNotFound,
      );
    }

    const history = await this.proposalHistoryService.find({
      where: { proposal: { id: proposal.id } },
      relations: { status: true, user: { avatar: true } },
    });

    //If proposalNeedRevision or proposalRejected only (leaves th func)
    if (
      updateProposalStatusDto.status === 'proposalNeedRevision' ||
      updateProposalStatusDto.status === 'proposalRejected'
    ) {
      const status = await this.statusService.findOne({
        where: { statusType: updateProposalStatusDto.status },
      });

      if (proposal.status.statusType === 'proposalRejected') {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'ProposalExceptions',
          ProposalExceptions.ProposalIsRejected,
        );
      }

      const commentEvent = await this.addComment(
        proposal,
        updateProposalStatusDto.comment,
        status,
        userId,
      );

      history.push(commentEvent);

      return {
        ...proposal,
        history: history,
      } as ProposalsEntity;
    }

    //Other ONCE in history statuses
    const isInStatuses =
      history?.length > 0 &&
      history?.some(
        (event) => event.status.statusType === updateProposalStatusDto.status,
      );

    if (!isInStatuses) {
      const status = await this.statusService.findOne({
        where: { statusType: updateProposalStatusDto.status },
      });

      proposal.status = status;
      history.push(
        await this.proposalHistoryService.save({
          proposal: { id: proposal.id },
          status: status,
          user: { id: userId },
        }),
      );
    } else {
      return { ...proposal, history } as ProposalsEntity;
    }

    const isCreatePostStatus = createPostStatuses.some(
      (value) => value === updateProposalStatusDto.status,
    );

    if (isCreatePostStatus) {
      if (proposal.status?.statusType === 'proposalRejected') {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'ProposalExceptions',
          ProposalExceptions.ProposalIsRejected,
        );
      }

      const post = await this.postService.findOne({
        where: { proposal: { id: proposal.id } },
      });

      if (!post) await this.postService.save({ proposal: proposal });
    }

    await this.save(proposal);

    return {
      ...proposal,
      history: history,
    } as ProposalsEntity;
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

  async addComment(
    proposal: ProposalsEntity,
    text: string,
    status: ProposalStatus,
    userId: number,
  ) {
    return await this.proposalHistoryService.save({
      user: { id: userId },
      proposal: proposal,
      comment: text,
      status: status,
    });
  }
}
