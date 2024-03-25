import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly surname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly lastname?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly phone?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly department: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly job: number;

  @IsDate()
  @ApiProperty()
  readonly birthday: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  readonly vk?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ nullable: true })
  readonly telegram?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly company: number;
}
