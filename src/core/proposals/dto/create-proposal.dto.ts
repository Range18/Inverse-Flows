import {
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProposalDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  document?: string;

  isDocumentGenerated: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}

export type CreateProposal = CreateProposalDto & {
  author: number;
  files: Express.Multer.File[];
};
