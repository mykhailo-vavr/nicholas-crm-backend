import { Address } from '@prisma/client';

export class BaseAddressResponse implements Address {
  id: number;

  city: string;

  street: string;

  streetNumber: string | null;

  flatNumber: number | null;

  latitude: number;

  longitude: number;

  createdAt: Date;

  updatedAt: Date;
}
