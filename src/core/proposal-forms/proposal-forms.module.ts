import { Module } from '@nestjs/common';
import { ProposalFormsService } from './proposal-forms.service';
import { ProposalFormsController } from './proposal-forms.controller';

@Module({
  controllers: [ProposalFormsController],
  providers: [ProposalFormsService]
})
export class ProposalFormsModule {}
