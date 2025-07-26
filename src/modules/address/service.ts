import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateAddressDto } from './dtos';
import { IsAddressTakenQuery } from './queries';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateAddressDto) {
    const { isTaken, id } = await this.isTaken(data);

    if (isTaken && id) {
      return { id };
    }

    const address = await this.prismaService.client().address.create({
      data: {
        city: data.city,
        street: data.street,
        streetNumber: data.streetNumber,
        flatNumber: data.flatNumber,
        latitude: data.latitude,
        longitude: data.longitude,
      },
      select: {
        id: true,
      },
    });

    return address;
  }

  async isTaken(query: IsAddressTakenQuery) {
    const address = await this.prismaService.client().address.findFirst({
      where: {
        city: query.city,
        street: query.street,
        streetNumber: query.streetNumber,
        flatNumber: query.flatNumber,
      },
    });

    return {
      isTaken: !!address,
      id: address?.id || null,
    };
  }
}
