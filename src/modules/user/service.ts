import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { excludeColumns, formatPaginatedResponse, getPaginationOptions, getSortOptions, hash } from 'src/utils';
import { BaseResponse, PrismaService } from '../../common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { GetAllUsersQuery, IsUserTakenQuery } from './queries';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto) {
    const { isTaken } = await this.isTaken({
      email: data.email,
      phone: data.phone,
    });

    if (isTaken) {
      throw new ConflictException('User with such email or phone is already exists');
    }

    const hashedPassword = await hash(data.password);

    const user = await this.prismaService.client().user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    return user;
  }

  async getAll(query: GetAllUsersQuery) {
    const {
      search = '',
      sort = Prisma.UserScalarFieldEnum.id,
      order = Prisma.SortOrder.asc,
      page = 0,
      limit = 20,
    } = query;

    const where: Prisma.UserFindManyArgs['where'] = {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ],
    };

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.client().user.findMany({
        where,
        ...getPaginationOptions({ page, limit }),
        ...getSortOptions({ sort, order }),
        select: excludeColumns('User', ['password']),
      }),
      this.prismaService.client().user.count({ where }),
    ]);

    return formatPaginatedResponse({ items: users, total });
  }

  async getByEmail(email: string) {
    return this.prismaService.client().user.findUnique({
      where: { email },
    });
  }

  async getByPk(id: number) {
    const user = await this.prismaService.client().user.findUnique({
      where: { id },
      select: excludeColumns('User', ['password']),
    });

    if (!user) {
      throw new NotFoundException('There is no user with such id');
    }

    return user;
  }

  async isTaken(query: IsUserTakenQuery) {
    const [userEmail, userPhone] = await Promise.all([
      this.prismaService.client().user.findFirst({
        where: { email: query.email },
      }),
      this.prismaService.client().user.findFirst({
        where: { phone: query.phone },
      }),
    ]);

    return {
      isTaken: !!(userEmail || userPhone),
      email: !!userEmail,
      phone: !!userPhone,
    };
  }

  async update(id: number, data: UpdateUserDto): Promise<BaseResponse> {
    await this.getByPk(id);

    await this.prismaService.client().user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });

    return { ok: true };
  }
}
