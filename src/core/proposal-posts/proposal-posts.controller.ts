import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ProposalPostsService } from './proposal-posts.service';
import { UpdateProposalPostDto } from './dto/update-proposal-post.dto';

@Controller('proposal-posts')
export class ProposalPostsController {
  constructor(private readonly proposalPostsService: ProposalPostsService) {}

  // @Post()
  // create(@Body() createProposalPostDto: CreateProposalPostDto) {
  //   return this.proposalPostsService.create(createProposalPostDto);
  // }

  @Get()
  async findAll() {
    return await this.proposalPostsService.find({});
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.proposalPostsService.findOne({ where: { id } });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProposalPostDto: UpdateProposalPostDto,
  ) {
    return await this.proposalPostsService.updateOne(
      { where: { id } },
      updateProposalPostDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.proposalPostsService.removeOne({ where: { id } });
  }
}
