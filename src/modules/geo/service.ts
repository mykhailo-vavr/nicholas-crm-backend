import { Client, Status } from '@googlemaps/google-maps-services-js';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from 'src/common';
import { isTruthy } from 'src/utils';
import { BOUNDS, REGION } from './definitions';

@Injectable()
export class GeoService {
  private readonly client: Client;

  private readonly key: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client();
    this.key = this.configService.getOrThrow('GOOGLE_MAPS_API_KEY');
  }

  async getCoordinates(query: { city: string; street: string; streetNumber?: string | null }) {
    const address = [query.city, query.street, query.streetNumber].filter(isTruthy).join(', ');

    const { data } = await this.client.geocode({
      params: {
        key: this.key,
        address,
        region: REGION,
        bounds: BOUNDS,
      },
    });

    if (data.status !== Status.OK) {
      throw new InternalServerErrorException(data.error_message);
    }

    const { lat, lng } = data.results[0].geometry.location;

    return { latitude: lat, longitude: lng };
  }
}
