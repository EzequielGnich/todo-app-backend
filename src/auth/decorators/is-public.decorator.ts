import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = process.env.PUBLIC_KEY;
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
