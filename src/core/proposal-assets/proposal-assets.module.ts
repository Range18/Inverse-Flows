import { Module } from '@nestjs/common';
import { ProposalAssetsService } from './proposal-assets.service';
import { ProposalAssetsController } from './proposal-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalAssetEntity } from '#src/core/proposal-assets/entities/proposal-asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProposalAssetEntity])],
  controllers: [ProposalAssetsController],
  providers: [ProposalAssetsService],
  exports: [ProposalAssetsService],
})
export class ProposalAssetsModule {}
