import { Test, TestingModule } from '@nestjs/testing';
import { ChildController } from './controller';
import { ChildService } from './service';

describe('ChildController', () => {
  let controller: ChildController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildController],
      providers: [ChildService],
    }).compile();

    controller = module.get<ChildController>(ChildController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
