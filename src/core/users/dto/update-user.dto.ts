import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  department: number;

  @ApiProperty()
  job: number;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  role: number;

  @ApiProperty()
  telegram: string;

  @ApiProperty()
  vk: string;
}
