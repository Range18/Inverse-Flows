import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '#src/core/companies/entities/company.entity';
import { UserEntity } from '#src/core/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, UserEntity])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
