import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { IsAddressTakenQuery } from './queries';
import { IsAddressTakenResponse } from './responses';
import { GeoService } from '../geo';
import { CreateAddressDto } from './dtos';

@Injectable()
export class AddressService {
  constructor(
    private readonly geoService: GeoService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(data: CreateAddressDto) {
    const { isTaken, id } = await this.isTaken(data);

    if (isTaken && id) {
      return { id };
    }

    const coordinates = await this.geoService.getCoordinates(data);

    const address = await this.prismaService.client().address.create({
      data: {
        ...data,
        ...coordinates,
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
