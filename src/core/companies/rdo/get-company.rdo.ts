import { ApiProperty } from '@nestjs/swagger';

export class GetCompanyRdo {
  @ApiProperty()
  address: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  inn: string;

  @ApiProperty()
  kpp: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ogrn: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
