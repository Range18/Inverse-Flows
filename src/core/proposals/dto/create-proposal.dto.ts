import { IsNumber, IsObject, IsString } from 'class-validator';
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
  @ApiProperty()
  document: string;
}

export type CreateProposal = CreateProposalDto & { author: number };
