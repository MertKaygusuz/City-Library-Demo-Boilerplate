import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable, Scope } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RefreshToken } from '../entities/cache/refresh-token';

@Injectable({ scope: Scope.REQUEST })
export class RefreshTokenService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  expireTimeInSeconds: number =
    3600 * parseInt(process.env.REFRESH_TOKEN_EXPIRATION);
  redisCachePrefix: string = process.env.REDIS_INSTANCE_NAME;

  async createOrUpdate(token: RefreshToken) {
    await this.redis.set(
      this.redisCachePrefix + token.tokenKey,
      JSON.stringify(token),
      'EX',
      this.expireTimeInSeconds,
    );
  }

  async getByKey(key: string): Promise<RefreshToken> {
    const rawData = await this.redis.get(this.redisCachePrefix + key);
    if (rawData) return JSON.parse(rawData);

    return null;
  }

  async delete(key: string) {
    await this.redis.del(this.redisCachePrefix + key);
  }
}
