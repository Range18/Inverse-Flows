import { IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProposalDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNumber()
  @ApiProperty()
  readonly category: number;

  @IsObject()
  @ApiProperty()
  content: { [key: string]: any };
}

export type CreateProposal = CreateProposalDto & { author: number };
