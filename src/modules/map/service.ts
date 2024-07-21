import { Client, Status } from '@googlemaps/google-maps-services-js';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from 'src/common';

// TODO: refactor this

@Injectable()
export class MapService {
  private readonly client: Client;

  private readonly key: string;

  private readonly region = 'ua';

  private readonly bounds = {
    northeast: {
      lat: 49.605455,
      lng: 25.700183,
    },
    southwest: {
      lat: 49.471775,
      lng: 25.49172,
    },
  };

  constructor(private readonly configService: ConfigService) {
    this.client = new Client();
    this.key = this.configService.getOrThrow('GOOGLE_MAPS_API_KEY');
  }

  async getCoordinates(query: { city: string; street: string; streetNumber?: string | null }) {
    const address = [query.city, query.street, query.streetNumber].filter(Boolean).join(', ');

    try {
      const response = await this.client.geocode({
        params: {
          key: this.key,
          address,
          region: this.region,
          bounds: this.bounds,
        },
      });

      if (response.data.status !== Status.OK) {
        throw new InternalServerErrorException(response.data.error_message);
      }

      const { lat, lng } = response.data.results[0].geometry.location;

      return { latitude: lat, longitude: lng };
    } catch (e) {
      throw new Error();
    }
  }
}
