import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';
import { CreateCommentDto } from '#src/core/private-comments/dto/create-comment.dto';
import ProposalExceptions = AllExceptions.ProposalExceptions;

@Injectable()
export class PrivateCommentsService extends BaseEntityService<PrivateCommentEntity> {
  constructor(
    @InjectRepository(PrivateCommentEntity)
    private readonly privateCommentRepository: Repository<PrivateCommentEntity>,
    private readonly proposalsService: ProposalsService,
  ) {
    super(privateCommentRepository);
  }

  async addComment(createCommentDto: CreateCommentDto, userId: number) {
    const proposal = await this.proposalsService.findOne({
      where: { id: createCommentDto.ProposalId },
    });

    if (!proposal) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'ProposalExceptions',
        ProposalExceptions.ProposalNotFound,
      );
    }

    return await this.save({
      user: { id: userId },
      proposal: proposal,
      text: createCommentDto.text,
    });
  }
}
