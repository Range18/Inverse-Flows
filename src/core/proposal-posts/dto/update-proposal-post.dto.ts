import { PartialType } from '@nestjs/mapped-types';
import { CreateProposalPostDto } from './create-proposal-post.dto';

export class UpdateProposalPostDto extends PartialType(CreateProposalPostDto) {}
