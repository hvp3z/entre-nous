import Redis from 'ioredis';

export class CacheService {
  private redis: Redis | null = null;
  private memoryCache: Map<string, { value: unknown; expiry: number }> = new Map();

  constructor() {
    if (process.env.REDIS_URL) {
      try {
        this.redis = new Redis(process.env.REDIS_URL);
        this.redis.on('error', (err) => {
          console.warn('Redis connection error, falling back to memory cache:', err.message);
          this.redis = null;
        });
      } catch {
        console.warn('Redis not available, using memory cache');
      }
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.redis) {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
      }
      
      // Memory cache fallback
      const cached = this.memoryCache.get(key);
      if (cached && cached.expiry > Date.now()) {
        return cached.value as T;
      }
      this.memoryCache.delete(key);
      return null;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    try {
      if (this.redis) {
        await this.redis.setex(key, ttlSeconds, JSON.stringify(value));
      } else {
        // Memory cache fallback
        this.memoryCache.set(key, {
          value,
          expiry: Date.now() + ttlSeconds * 1000
        });
        
        // Clean up old entries periodically
        if (this.memoryCache.size > 1000) {
          this.cleanupMemoryCache();
        }
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      if (this.redis) {
        await this.redis.del(key);
      } else {
        this.memoryCache.delete(key);
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  private cleanupMemoryCache(): void {
    const now = Date.now();
    for (const [key, { expiry }] of this.memoryCache.entries()) {
      if (expiry < now) {
        this.memoryCache.delete(key);
      }
    }
  }
}

