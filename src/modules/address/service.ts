import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { IsAddressTakenQuery } from './queries';
import { IsAddressTakenResponse } from './responses';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async isTaken(query: IsAddressTakenQuery): Promise<IsAddressTakenResponse> {
    const address = await this.prismaService.client().address.findFirst({
      where: query,
    });

    return {
      isTaken: !!address,
      id: address?.id || null,
    };
  }
}
