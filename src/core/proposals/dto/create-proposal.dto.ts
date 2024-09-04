import {
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
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

  @IsNotEmptyObject()
  @IsOptional()
  content?: object;

  @IsString()
  @IsOptional()
  document?: string;

  @IsBooleanString()
  isDocumentGenerated: boolean;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}

export type CreateProposal = CreateProposalDto & {
  author: number;
  files: Express.Multer.File[];
};
