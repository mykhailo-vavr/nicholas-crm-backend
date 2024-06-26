import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { hash, excludeColumns, getPaginationOptions, formatPaginatedResponse, getSortOptions } from 'src/utils';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common';
import { CreateUserDto, DeactivateUserDto } from './dtos';
import { GetAllUsersQuery, IsUserTakenQuery } from './queries';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserByPkResponse,
  IsUserTakenResponse,
} from './responses';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async activate(id: number) {
    await this.getByPk(id);

    await this.prismaService.client().user.update({
      where: { id },
      data: {
        isActive: true,
      },
    });
  }

  async create(data: CreateUserDto): Promise<CreateUserResponse> {
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
      select: excludeColumns('User', ['password']),
    });

    return user;
  }

  async deactivate(id: number, data: DeactivateUserDto) {
    await this.getByPk(id);

    await this.prismaService.client().user.update({
      where: { id },
      data: {
        isActive: false,
        deactivationReason: data.deactivationReason,
      },
    });
  }

  async delete(id: number): Promise<DeleteUserResponse> {
    await this.getByPk(id);

    return this.prismaService.client().user.delete({
      where: { id },
    });
  }

  async getAll(query: GetAllUsersQuery): Promise<GetAllUsersResponse> {
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

  async getByPk(id: number): Promise<GetUserByPkResponse> {
    const user = await this.prismaService.client().user.findUnique({
      where: { id },
      select: excludeColumns('User', ['password']),
    });

    if (!user) {
      throw new NotFoundException('There is no user with such id');
    }

    return user;
  }

  async isTaken(query: IsUserTakenQuery): Promise<IsUserTakenResponse> {
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
}
