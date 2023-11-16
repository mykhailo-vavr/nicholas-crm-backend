import { Test, TestingModule } from '@nestjs/testing';
import { GiftService } from './service';
import { PrismaModule } from '../../common/prisma';

describe('GiftService', () => {
  let service: GiftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GiftService],
    }).compile();

    service = module.get<GiftService>(GiftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
