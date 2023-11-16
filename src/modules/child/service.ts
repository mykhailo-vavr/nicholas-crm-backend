import { Prisma } from '@prisma/client';
import { formatPaginatedResponse, getPaginationOptions, getSortOptions } from 'src/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common';
import { CreateChildDto, DeactivateChildDto } from './dtos';
import { CreateChildResponse, DeleteChildResponse, GetAllChildrenResponse, GetChildByPkResponse } from './responses';
import { GetAllChildrenQuery } from './queries';
import { AddressService } from '../address';

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

    const isAddressTaken = await this.addressService.isTaken(address);

    const child = await this.prismaService.client().child.create({
      data: {
        ...childData,
        address: isAddressTaken.id ? { connect: { id: isAddressTaken.id } } : { create: address },
      },
      include: {
        address: true,
      },
    });

    return child;
  }

  async deactivate(id: number, data: DeactivateChildDto) {
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
      sort = Prisma.UserScalarFieldEnum.id,
      order = Prisma.SortOrder.asc,
      page = 0,
      limit = 20,
    } = query;

    const where: Prisma.ChildFindManyArgs['where'] = {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { deactivationReason: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ],
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
}
