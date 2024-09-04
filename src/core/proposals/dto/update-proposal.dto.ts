import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProposalDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  documentLink?: string;

  @IsNumber()
  @IsOptional()
  category?: number;

  @IsString()
  @IsOptional()
  content?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}
