import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../common/prisma';
import { GiftService } from './service';

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
