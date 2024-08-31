import { Test, TestingModule } from '@nestjs/testing';
import { ProposalFieldsService } from './proposal-fields.service';

describe('ProposalFieldsService', () => {
  let service: ProposalFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProposalFieldsService],
    }).compile();

    service = module.get<ProposalFieldsService>(ProposalFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
