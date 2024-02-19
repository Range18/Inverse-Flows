import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalsEntity } from '#src/core/proposals/entity/proposals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
import { DepartmentsService } from '#src/core/departments/departments.service';
import UserExceptions = AllExceptions.UserExceptions;
import CategoryExceptions = AllExceptions.CategoryExceptions;

@Injectable()
export class ProposalsService extends BaseEntityService<ProposalsEntity> {
  constructor(
    @InjectRepository(ProposalsEntity)
    private readonly proposalRepository: Repository<ProposalsEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly documentService: DocumentsService,
    private readonly statusService: ProposalStatusService,
    private readonly eventService: ProposalHistoryService,
    private readonly departmentService: DepartmentsService,
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

    await this.save(proposal);

    await this.eventService.save({
      proposal: proposal,
      user: user,
      status: await this.statusService.findOne({
        where: { name: StatusType.proposalCreated },
      }),
    });

    await this.eventService.save({
      proposal: proposal,
      user: user,
      status: inApproveStatus,
    });

    return { ...proposal, document } as ProposalsEntity;
  }
}
