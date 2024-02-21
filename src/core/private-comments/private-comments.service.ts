import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { ProposalsService } from '#src/core/proposals/proposals.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';
import { CreatePrivateCommentDto } from '#src/core/private-comments/dto/create-private-comment.dto';
import { ProposalHistoryService } from '#src/core/history/proposal-history.service';
import { UserRequest } from '#src/common/types/user-request.type';
import { UserService } from '#src/core/users/user.service';
import ProposalExceptions = AllExceptions.ProposalExceptions;

@Injectable()
export class PrivateCommentsService extends BaseEntityService<PrivateCommentEntity> {
  constructor(
    @InjectRepository(PrivateCommentEntity)
    private readonly privateCommentRepository: Repository<PrivateCommentEntity>,
    private readonly proposalsService: ProposalsService,
    private readonly proposalHistoryService: ProposalHistoryService,
    private readonly userService: UserService,
  ) {
    super(privateCommentRepository);
  }

  async addComment(
    createCommentDto: CreatePrivateCommentDto,
    user: UserRequest,
  ) {
    const proposal = await this.proposalsService.findOne({
      where: { id: createCommentDto.proposalId },
      relations: { author: true },
    });

    if (!proposal) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'ProposalExceptions',
        ProposalExceptions.ProposalNotFound,
      );
    }

    if (proposal.author.id != user.id && user.role.name != 'member') {
      await this.proposalHistoryService.save({
        user: user,
        proposal: proposal,
        status: { statusType: 'proposalNeedRevision' },
      });
    }

    return await this.save({
      user: await this.userService.findOne({
        where: { id: user.id },
        relations: { avatar: true },
      }),
      proposal: proposal,
      text: createCommentDto.text,
    });
  }
}
