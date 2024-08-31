import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProposalDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly category: number;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsNotEmptyObject()
  @IsOptional()
  content?: { [key: string]: any };

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  document?: string;

  @IsBoolean()
  @ApiProperty()
  isDocumentGenerated: boolean;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}

export type CreateProposal = CreateProposalDto & { author: number };
