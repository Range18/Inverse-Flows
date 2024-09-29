import {
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProposalDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsBooleanString()
  isDocumentGenerated: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}

export type CreateProposal = CreateProposalDto & {
  author: number;
  files: Express.Multer.File[];
};
