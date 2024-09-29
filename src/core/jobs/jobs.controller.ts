import { Controller, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JobEntity } from '#src/core/jobs/entities/job.entity';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOkResponse({ type: [JobEntity] })
  @Get()
  async findAll() {
    return await this.jobsService.find({}, true);
  }

  @ApiOkResponse({ type: JobEntity })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.jobsService.findOne({ where: { id } }, true);
  }
}
