import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { getPaginationOptions, formatPaginatedResponse, getSortOptions } from 'src/utils';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common';
import { CreateGiftDto } from './dtos';
import { GetAllGiftsQuery } from './queries';
import {
  CreateGiftResponse,
  DeleteGiftResponse,
  GetAllGiftsResponse,
  GetGiftByPkResponse,
  IsGiftTakenResponse,
} from './responses';
import { IsGiftTakenQuery } from './queries/is-taken.query';

@Injectable()
export class GiftService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateGiftDto): Promise<CreateGiftResponse> {
    const { isTaken } = await this.isTaken({
      name: data.name,
    });

    if (isTaken) {
      throw new ConflictException('Gift with such name is already exists');
    }

    const gift = await this.prismaService.client().gift.create({
      data,
    });

    return gift;
  }

  async delete(id: number): Promise<DeleteGiftResponse> {
    await this.getByPk(id);

    return this.prismaService.client().gift.delete({
      where: { id },
    });
  }

  async getAll(query: GetAllGiftsQuery): Promise<GetAllGiftsResponse> {
    const {
      search = '',
      sort = Prisma.GiftScalarFieldEnum.id,
      order = Prisma.SortOrder.asc,
      page = 0,
      limit = 20,
    } = query;

    const where: Prisma.GiftFindManyArgs['where'] = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ],
    };

    const [gifts, total] = await this.prismaService.$transaction([
      this.prismaService.client().gift.findMany({
        where,
        ...getPaginationOptions({ page, limit }),
        ...getSortOptions({ sort, order }),
      }),
      this.prismaService.client().gift.count({ where }),
    ]);

    return formatPaginatedResponse({ items: gifts, total });
  }

  async getByPk(id: number): Promise<GetGiftByPkResponse> {
    const gift = await this.prismaService.client().gift.findUnique({
      where: { id },
    });

    if (!gift) {
      throw new NotFoundException('There is no gift with such id');
    }

    return gift;
  }

  async isTaken(query: IsGiftTakenQuery): Promise<IsGiftTakenResponse> {
    const gift = await this.prismaService.client().gift.findFirst({
      where: { name: query.name },
    });

    return {
      isTaken: !!gift,
      name: !!gift,
    };
  }
}
