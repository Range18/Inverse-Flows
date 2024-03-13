import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ nullable: true, required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsString()
  inn: string;

  @ApiProperty()
  @IsString()
  kpp: string;

  @ApiProperty()
  @IsString()
  ogrn: string;
}
