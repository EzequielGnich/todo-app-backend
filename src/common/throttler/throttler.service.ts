import { Injectable } from '@nestjs/common';
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  createThrottlerOptions(): ThrottlerModuleOptions | Promise<ThrottlerModuleOptions> {
    return {
      throttlers: [
        {
          ttl: 60,
          limit: 10
        },
        {
          ttl: 60 * 60,
          limit: 100
        }
      ]
    };
  }
}
