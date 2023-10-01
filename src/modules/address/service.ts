import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateAddressDto } from './dto';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateAddressDto) {
    const existedAddress = await this.getIdentical(data);

    if (existedAddress) {
      throw new ConflictException(
        'There is already existing address with such params',
      );
    }

    const address = await this.prismaService.client().address.create({
      data,
    });

    return address;
  }

  async getIdentical(data: CreateAddressDto) {
    const address = await this.prismaService.client().address.findFirst({
      where: data,
    });

    return address;
  }

  async delete(id: number) {
    await this.getByPk(id);

    return this.prismaService.client().user.delete({
      where: { id },
    });
  }

  async getAll() {
    const addresses = await this.prismaService.client().address.findMany();

    return addresses;
  }

  async getByPk(id: number) {
    const address = await this.prismaService.client().address.findUnique({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('There is no address with such id');
    }

    return address;
  }
}
