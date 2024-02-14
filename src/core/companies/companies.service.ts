import { Injectable } from '@nestjs/common';
import { BaseEntityService } from '#src/common/base-entity.service';
import { Company } from '#src/core/companies/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService extends BaseEntityService<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {
    super(companyRepository);
  }
}
