import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { Prisma } from 'src/types';
import { IsAddressTakenQuery } from './queries';
import { IsAddressTakenResponse } from './responses';
import { MapService } from '../map';

@Injectable()
export class AddressService {
  constructor(
    private readonly mapService: MapService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(data: Omit<Prisma.AddressCreateInput, 'latitude' | 'longitude'>) {
    const { isTaken, id } = await this.isTaken(data);

    if (isTaken && id) {
      return { id };
    }

    const coordinates = await this.mapService.getCoordinates(data);

    const address = await this.prismaService.client().address.create({
      data: {
        ...data,
        ...(coordinates as any),
      },
    });

    return address;
  }

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
