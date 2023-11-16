import { Address } from 'src/types';

export class BaseAddressResponse implements Address {
  id: number;

  city: string;

  street: string;

  streetNumber: string | null;

  flatNumber: number | null;

  createdAt: Date;

  updatedAt: Date;
}
