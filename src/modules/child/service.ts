import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common';
import { formatPaginatedResponse, getPaginationOptions, getSortOptions } from 'src/utils';
import { AddressService } from '../address';
import { CreateChildDto, DeactivateChildDto, IsChildTakenDto } from './dtos';
import { CreateManyChildrenDto } from './dtos/create-many.dto';
import { GetAllChildrenQuery } from './queries';
import { CreateChildResponse, DeleteChildResponse, GetAllChildrenResponse, GetChildByPkResponse } from './responses';
import { IsChildTakenResponse } from './responses/is-taken.response';

// TODO: create isTaken method (firstName, lastName, birthYear)

@Injectable()
export class ChildService {
  constructor(
    private readonly addressService: AddressService,
    private readonly prismaService: PrismaService,
  ) {}

  async activate(id: number) {
    await this.getByPk(id);

    await this.prismaService.client().child.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }

  async create(data: CreateChildDto): Promise<CreateChildResponse> {
    const { address, ...childData } = data;

    const createdChild = await this.prismaService.createTransaction(async () => {
      const { id } = await this.addressService.create(address);

      const child = await this.prismaService.client().child.create({
        data: {
          ...childData,
          address: {
            connect: {
              id,
            },
          },
        },
        include: {
          address: true,
        },
      });

      return child;
    });

    return createdChild;
  }

  async createMany(data: CreateManyChildrenDto): Promise<void> {
    await this.prismaService.createTransaction(async () => {
      await Promise.all(data.items.map((item) => this.create(item)));
    });
  }

  async deactivate(id: number, data: DeactivateChildDto): Promise<void> {
    await this.getByPk(id);

    await this.prismaService.client().child.update({
      where: { id },
      data: {
        isActive: false,
        deactivationReason: data.deactivationReason,
      },
    });
  }

  async delete(id: number): Promise<DeleteChildResponse> {
    await this.getByPk(id);

    return this.prismaService.client().child.delete({
      where: { id },
      include: { address: true },
    });
  }

  async getAll(query: GetAllChildrenQuery): Promise<GetAllChildrenResponse> {
    const {
      search = '',
      sort = Prisma.ChildScalarFieldEnum.id,
      order = Prisma.SortOrder.asc,
      page = 0,
      limit = 20,
    } = query;

    const where: Prisma.ChildFindManyArgs['where'] = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { deactivationReason: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [children, total] = await this.prismaService.$transaction([
      this.prismaService.client().child.findMany({
        where,
        ...getPaginationOptions({ page, limit }),
        ...getSortOptions({ sort, order }),
        include: { address: true },
      }),
      this.prismaService.client().child.count({ where }),
    ]);

    return formatPaginatedResponse({ items: children, total });
  }

  async getByPk(id: number): Promise<GetChildByPkResponse> {
    const child = await this.prismaService.client().child.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!child) {
      throw new NotFoundException('There is no child with such id');
    }

    return child;
  }

  async isTaken(query: IsChildTakenDto): Promise<IsChildTakenResponse> {
    const child = await this.prismaService.client().child.findFirst({
      where: {
        lastName: query.lastName,
        firstName: query.firstName,
        birthYear: query.birthYear,
      },
      include: {
        address: true,
      },
    });

    return {
      isTaken: !!child,
      child: child || undefined,
    };
  }
}
