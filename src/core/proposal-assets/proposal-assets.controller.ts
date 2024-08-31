import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ProposalAssetsService } from './proposal-assets.service';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Proposal assets')
@Controller('proposals/:proposalId/assets')
export class ProposalAssetsController {
  constructor(private readonly proposalAssetsService: ProposalAssetsService) {}

  @Get(':name/source')
  async findOneSource(
    @Res({ passthrough: true }) res: Response,
    @Param('name') name: string,
  ): Promise<StreamableFile> {
    const { mimetype, buffer } = await this.proposalAssetsService.getAsset(
      name,
    );

    res.setHeader('Content-Type', mimetype);

    return buffer;
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.proposalAssetsService.findOne({
      where: { filename: name },
    });
  }

  @Get()
  async findAll(@Param('proposalId') proposalId: number) {
    return await this.proposalAssetsService.find({
      where: { proposal: { id: proposalId } },
    });
  }
}
