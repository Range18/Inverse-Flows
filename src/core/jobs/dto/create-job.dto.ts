import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ nullable: true })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
