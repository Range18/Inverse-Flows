import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProposalPostQuery {
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  order?: string;

  @IsString()
  @IsOptional()
  by?: string;
}
