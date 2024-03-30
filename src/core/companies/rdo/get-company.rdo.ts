import { ApiProperty } from '@nestjs/swagger';
import { Company } from '#src/core/companies/entities/company.entity';

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

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.description = company.description;
    this.address = company.address;
    this.inn = company.inn;
    this.kpp = company.kpp;
    this.ogrn = company.ogrn;

    this.createdAt = company.createdAt;
    this.updatedAt = company.updatedAt;
  }
}
