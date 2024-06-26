import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JobEntity } from '#src/core/jobs/entities/job.entity';

@ApiTags('Jobs')
@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  //TODO PERMS
  @ApiCreatedResponse({ type: JobEntity })
  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    return await this.jobsService.save(createJobDto);
  }

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

  //TODO PERMS
  @ApiBody({ type: UpdateJobDto })
  @ApiOkResponse({ type: JobEntity })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobsService.updateOne(
      { where: { id } },
      updateJobDto,
      true,
    );
  }

  //TODO PERMS
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.jobsService.removeOne({ where: { id } }, true);
  }
}
