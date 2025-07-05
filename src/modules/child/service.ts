import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common';
import { AddressService } from '../address';
import { CreateChildDto, CreateManyChildrenDto } from './dtos';
import { GetAllChildrenQuery, IsChildTakenQuery } from './queries';

@Injectable()
export class ChildService {
  constructor(
    private readonly addressService: AddressService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(data: CreateChildDto) {
    const isTaken = await this.isTaken({
      firstName: data.firstName,
      lastName: data.lastName,
      birthYear: data.birthYear,
      phone: data.phone,
    });

    if (isTaken) {
      throw new BadRequestException('Дані дитини вже записані в системі.');
    }

    await this.prismaService.client().child.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthYear: data.birthYear,
        gender: data.gender,
        phone: data.phone,
        notes: data.notes,
        needStatus: data.needStatus,
        status: data.status,
      },
    });

    return { ok: true };
  }

  async createMany(data: CreateManyChildrenDto) {
    await this.prismaService.createTransaction(async () => {
      await Promise.all(data.items.map((item) => this.create(item)));
    });

    return { ok: true };
  }

  async getAll({ search, page, limit, sort, order }: GetAllChildrenQuery) {
    const where: Prisma.ChildWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [children, count] = await Promise.all([
      this.prismaService.child.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sort]: order,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          birthYear: true,
          gender: true,
          phone: true,
          needStatus: true,
          status: true,
        },
      }),
      this.prismaService.child.count({ where }),
    ]);

    return {
      items: children,
      total: count,
    };
  }

  async getByPk(id: number) {
    const child = await this.prismaService.client().child.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!child) {
      throw new NotFoundException('Дані дитини не знайдено.');
    }

    return child;
  }

  async isTaken(query: IsChildTakenQuery) {
    const child = await this.prismaService.client().child.findFirst({
      where: {
        lastName: query.lastName,
        firstName: query.firstName,
        birthYear: query.birthYear,
        phone: query.phone,
      },
      select: {
        id: true,
      },
    });

    return {
      isTaken: !!child,
    };
  }
}
