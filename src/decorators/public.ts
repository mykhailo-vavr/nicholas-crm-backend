import { SetMetadata } from '@nestjs/common';
import { METADATA_KEYS } from 'src/utils';

export function Public() {
  return SetMetadata(METADATA_KEYS.IS_PUBLIC, true);
}
