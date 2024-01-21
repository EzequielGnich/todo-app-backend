import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  createThrottlerOptions(): ThrottlerModuleOptions | Promise<ThrottlerModuleOptions> {
    const config = new ConfigService();
    return {
      throttlers: [
        {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT')
        },
        {
          ttl: config.get('THROTTLE_TTL') * 60,
          limit: config.get('THROTTLE_LIMIT') * 10
        }
      ]
    };
  }
}
