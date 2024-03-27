import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Content } from '#src/core/proposals/types/content.type';

export class CreateProposalDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @ApiProperty()
  readonly category: number;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsObject()
  @ApiProperty()
  content: Content;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  document?: string;

  @IsBoolean()
  @ApiProperty()
  isDocumentGenerated: boolean;

  @IsBoolean()
  @ApiProperty()
  isCommercial: boolean;
}

export type CreateProposal = CreateProposalDto & { author: number };
