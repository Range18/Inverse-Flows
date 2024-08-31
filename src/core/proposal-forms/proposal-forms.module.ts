import { Module } from '@nestjs/common';
import { ProposalFormsService } from './proposal-forms.service';
import { ProposalFormsController } from './proposal-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalFormEntity } from '#src/core/proposal-forms/entities/proposal-form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProposalFormEntity])],
  controllers: [ProposalFormsController],
  providers: [ProposalFormsService],
})
export class ProposalFormsModule {}
