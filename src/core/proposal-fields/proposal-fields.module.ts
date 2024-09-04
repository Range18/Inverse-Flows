import { Module } from '@nestjs/common';
import { ProposalFieldsService } from './proposal-fields.service';
import { ProposalFieldsController } from './proposal-fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalFieldEntity } from '#src/core/proposal-fields/entities/proposal-field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProposalFieldEntity])],
  controllers: [ProposalFieldsController],
  providers: [ProposalFieldsService],
})
export class ProposalFieldsModule {}
