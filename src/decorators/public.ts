import { SetMetadata } from '@nestjs/common';
import { MetadataKeysEnum } from 'src/utils';

export const Public = () => SetMetadata(MetadataKeysEnum.IS_PUBLIC, true);
