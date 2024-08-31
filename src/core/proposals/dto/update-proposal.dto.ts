import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateProposalDto {
  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsUrl()
  @IsOptional()
  documentLink?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsNumber()
  @IsOptional()
  category?: number;

  @ApiProperty({ required: false, nullable: true })
  @IsString()
  @IsOptional()
  content?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}
