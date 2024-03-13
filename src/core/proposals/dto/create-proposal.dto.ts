import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
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

  @IsBoolean()
  @ApiProperty()
  isDocumentGenerated: boolean;

  //TODO DELETE
  //Just for testing (all this data must be in author)
  @IsString()
  @ApiProperty()
  firstname?: string;

  @IsString()
  @ApiProperty()
  surname?: string;

  @IsString()
  @ApiProperty()
  lastname?: string;

  @IsString()
  @ApiProperty()
  department?: string;

  @IsString()
  @ApiProperty()
  telegram?: string;
}

export type CreateProposal = CreateProposalDto & { author: number };
