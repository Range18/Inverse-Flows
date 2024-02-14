import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
