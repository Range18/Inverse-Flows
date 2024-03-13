import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  inn?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  kpp?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  ogrn?: string;
}
