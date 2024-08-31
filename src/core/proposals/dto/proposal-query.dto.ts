import type { FindOptionsOrderValue } from 'typeorm';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProposalQueryDto {
  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @Min(1)
  @IsNumber()
  @Type(() => Number)
  @ValidateIf((obj) => obj.limit)
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  order?: FindOptionsOrderValue;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  responsibleDepartmentId?: number;
}
