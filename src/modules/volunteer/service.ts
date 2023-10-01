import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma';
import { Role } from '@prisma/client';
import { CreateVolunteerDto } from './dto';
import { UserService } from '../user';

@Injectable()
export class VolunteerService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(data: CreateVolunteerDto) {
    const { user, ...volunteerData } = data;

    const createdVolunteer = await this.prismaService.createTransaction(
      async () => {
        const { id } = await this.userService.create({
          ...user,
          role: Role.volunteer,
        });

        const volunteer = await this.prismaService.client().volunteer.create({
          data: {
            ...volunteerData,
            user: { connect: { id } },
          },
        });
        return volunteer;
      },
    );

    return createdVolunteer;
  }

  async delete(id: number) {
    await this.getByPk(id);

    return this.prismaService.client().volunteer.delete({
      where: { id },
    });
  }

  async getAll() {
    const volunteers = await this.prismaService.client().volunteer.findMany();

    return volunteers;
  }

  async getByPk(id: number) {
    const volunteer = await this.prismaService.client().volunteer.findUnique({
      where: { id },
    });

    if (!volunteer) {
      throw new NotFoundException('There is no volunteer with such id');
    }

    return volunteer;
  }

  async getByUserId(id: number) {
    const volunteer = await this.prismaService.client().volunteer.findFirst({
      where: { user: { id } },
    });

    return volunteer;
  }
}
