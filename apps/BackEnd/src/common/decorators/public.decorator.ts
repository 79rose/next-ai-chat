import { SetMetadata } from '@nestjs/common';

export const IS_PUNLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUNLIC_KEY, true);
