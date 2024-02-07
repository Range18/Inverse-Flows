import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly surname: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly patronymic?: string;

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
}
