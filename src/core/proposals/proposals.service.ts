import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalsEntity } from '#src/core/proposals/proposals.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProposal,
  CreateProposalDto,
} from '#src/core/proposals/dto/create-proposal.dto';
import { UserService } from '#src/core/users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { CategoryService } from '#src/core/categories/category.service';
import { DocumentsService } from '#src/core/documents/documents.service';
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

    const proposal = await this.save({
      author: user,
      category: category,
      name: createProposalDto.name,
      content: JSON.stringify(createProposalDto.content),
    });

    const document = await this.documentService.create(proposal);

    return { ...proposal, document };
  }
}
