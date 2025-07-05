import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'src/utils';
import { PrismaService } from '../../common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { GetAllUsersQuery, IsUserTakenQuery } from './queries';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto) {
    const isTaken = await this.isTaken({
      email: data.email,
      phone: data.phone,
    });

    if (isTaken) {
      throw new BadRequestException('Дані користувача вже існують.');
    }

    const hashedPassword = await hash(data.password);

    const user = await this.prismaService.user.create({
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

  async getAll({ search, page, limit, sort, order }: GetAllUsersQuery) {
    const where: Prisma.UserWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [users, count] = await Promise.all([
      this.prismaService.user.findMany({
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
          phone: true,
          email: true,
          roles: true,
          isActive: true,
        },
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      items: users,
      total: count,
    };
  }

  async getByPk(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        roles: true,
        isActive: true,
        deactivationReason: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено.');
    }

    return user;
  }

  async isTaken(query: IsUserTakenQuery) {
    const [userEmail, userPhone] = await Promise.all([
      this.prismaService.user.findUnique({
        where: { email: query.email },
      }),
      this.prismaService.user.findUnique({
        where: { phone: query.phone },
      }),
    ]);

    return {
      isTaken: !!(userEmail || userPhone),
      email: !!userEmail,
      phone: !!userPhone,
    };
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Користувача не знайдено.');
    }

    await this.prismaService.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        isActive: data.isActive,
        deactivationReason: data.deactivationReason,
      },
    });

    return { ok: true };
  }
}
