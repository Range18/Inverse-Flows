import { Test, TestingModule } from '@nestjs/testing';
import { ProposalFieldsController } from './proposal-fields.controller';
import { ProposalFieldsService } from './proposal-fields.service';

describe('ProposalFieldsController', () => {
  let controller: ProposalFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProposalFieldsController],
      providers: [ProposalFieldsService],
    }).compile();

    controller = module.get<ProposalFieldsController>(ProposalFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
