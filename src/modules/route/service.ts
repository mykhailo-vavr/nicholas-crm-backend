import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService, PrismaService } from 'src/common';
import { AddressService } from '../address';
import { ChildService } from '../child';
import { VolunteerService } from '../volunteer';
import { CreateRoutesDto } from './dto/create.dto';
import { GetRoutesConfigResponse } from './responses/get-configs.response';

@Injectable()
export class RouteService {
  constructor(
    private readonly addressService: AddressService,
    private readonly childService: ChildService,
    private readonly configService: ConfigService,
    // TODO: separate HttpModule logic, create FunctionsModule
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
    private readonly volunteerService: VolunteerService,
  ) {}

  async getAddressesClusters(maxChildrenPerCluster: number) {
    // TODO: create method getCoordinates in childService
    const children = await this.prismaService.client().child.findMany({
      include: {
        address: true,
      },
    });

    const coords = children.map((item) => ({ lat: item.address.latitude, lng: item.address.longitude }));

    const k = Math.max(1, Math.floor(coords.length / maxChildrenPerCluster));

    const response = await firstValueFrom(
      this.httpService.post(
        `${this.configService.get('FUNCTIONS_API_URL')}/kmeans`,
        { k, data: coords },
        {
          headers: { apiKey: this.configService.get('FUNCTIONS_API_KEY') },
        },
      ),
    );

    return [children, response.data as number[]] as const;
  }

  async create(data: CreateRoutesDto) {
    const [children, clusters] = await this.getAddressesClusters(data.maxChildrenPerCluster);

    children.map(async (item, i) => {
      await this.prismaService.client().route.upsert({
        create: {
          number: clusters[i],
          routeAdresses: {
            create: {
              address: {
                connect: { id: item.address.id },
              },
            },
          },
        },
        update: {
          routeAdresses: {},
        },
        where: {} as any,
      });
    });
  }

  async getConfigs(): Promise<GetRoutesConfigResponse> {
    const config = await this.prismaService.client().routeConfig.findMany();

    return { items: config };
  }

  async getConfigByYear(year: number) {
    const config = await this.prismaService.client().routeConfig.findUnique({
      where: {
        year,
      },
    });

    if (!config) {
      throw new NotFoundException('There is no route config for such year');
    }

    return config;
  }
}
