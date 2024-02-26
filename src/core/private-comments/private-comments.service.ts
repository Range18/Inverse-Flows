import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntityService } from '#src/common/base-entity.service';
import { PrivateCommentEntity } from '#src/core/private-comments/entities/private-comment.entity';

@Injectable()
export class PrivateCommentsService extends BaseEntityService<PrivateCommentEntity> {
  constructor(
    @InjectRepository(PrivateCommentEntity)
    private readonly privateCommentRepository: Repository<PrivateCommentEntity>,
  ) {
    super(privateCommentRepository);
  }
}
