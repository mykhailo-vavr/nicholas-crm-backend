import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { CreateChildDto, UpdateChildDto } from './dto';

@Injectable()
export class ChildService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateChildDto) {
    const child = await this.prismaService.client().child.create({
      data: {
        ...data,
        address: {
          create: {
            city: 'тестове місто',
            street: 'тестова вулиця',
            streetNumber: 9,
            flatNumber: 7,
          },
        },
      },
    });

    return child;
  }

  async delete(id: number) {
    await this.getByPk(id);

    return this.prismaService.client().user.delete({
      where: { id },
    });
  }

  async getAll() {
    const children = await this.prismaService.client().child.findMany();

    return children;
  }

  async getByPk(id: number) {
    const child = await this.prismaService.client().child.findUnique({
      where: { id },
    });

    if (!child) {
      throw new NotFoundException('There is no child with such id');
    }

    return child;
  }

  async update(id: number, data: UpdateChildDto) {
    await this.getByPk(id);

    const child = await this.prismaService.client().child.update({
      where: { id },
      data,
    });

    return child;
  }
}
