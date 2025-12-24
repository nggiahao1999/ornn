import { config } from "./config";

// Cache Store Interface
export interface CacheStore {
  get<T = any>(key: string): Promise<T | null>;
  put<T = any>(key: string, value: T, ttl?: number): Promise<boolean>;
  forget(key: string): Promise<boolean>;
  flush(): Promise<boolean>;
  has(key: string): Promise<boolean>;
  many<T = any>(keys: string[]): Promise<Record<string, T | null>>;
  putMany<T = any>(values: Record<string, T>, ttl?: number): Promise<boolean>;
  increment(key: string, value?: number): Promise<number | false>;
  decrement(key: string, value?: number): Promise<number | false>;
}

// In-Memory Store
class InMemoryStore implements CacheStore {
  private cache: Map<string, { value: any; expiresAt: number | null }> =
    new Map();

  async get<T = any>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  async put<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, { value, expiresAt });
    return true;
  }

  async forget(key: string): Promise<boolean> {
    return this.cache.delete(key);
  }

  async flush(): Promise<boolean> {
    this.cache.clear();
    return true;
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  async many<T = any>(keys: string[]): Promise<Record<string, T | null>> {
    const result: Record<string, T | null> = {};
    for (const key of keys) {
      result[key] = await this.get<T>(key);
    }
    return result;
  }

  async putMany<T = any>(
    values: Record<string, T>,
    ttl?: number,
  ): Promise<boolean> {
    for (const [key, value] of Object.entries(values)) {
      await this.put(key, value, ttl);
    }
    return true;
  }

  async increment(key: string, value: number = 1): Promise<number | false> {
    const current = await this.get<number>(key);
    const newValue = (current ?? 0) + value;
    await this.put(key, newValue);
    return newValue;
  }

  async decrement(key: string, value: number = 1): Promise<number | false> {
    return this.increment(key, -value);
  }
}

// Database Store (using Prisma)
class DatabaseStore implements CacheStore {
  private prisma: any;

  constructor() {
    // Lazy load prisma to avoid circular dependencies
    this.initPrisma();
  }

  private async initPrisma() {
    if (!this.prisma) {
      const { prisma } = await import("./prisma");
      this.prisma = prisma;
    }
  }

  private async ensurePrisma() {
    if (!this.prisma) {
      await this.initPrisma();
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    await this.ensurePrisma();
    try {
      const record = await this.prisma.cache.findUnique({
        where: { key },
      });

      if (!record) return null;

      if (record.expiresAt && new Date() > record.expiresAt) {
        await this.forget(key);
        return null;
      }

      return JSON.parse(record.value) as T;
    } catch {
      return null;
    }
  }

  async put<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    await this.ensurePrisma();
    try {
      const expiresAt = ttl ? new Date(Date.now() + ttl * 1000) : null;
      await this.prisma.cache.upsert({
        where: { key },
        update: { value: JSON.stringify(value), expiresAt },
        create: { key, value: JSON.stringify(value), expiresAt },
      });
      return true;
    } catch {
      return false;
    }
  }

  async forget(key: string): Promise<boolean> {
    await this.ensurePrisma();
    try {
      await this.prisma.cache.delete({ where: { key } });
      return true;
    } catch {
      return false;
    }
  }

  async flush(): Promise<boolean> {
    await this.ensurePrisma();
    try {
      await this.prisma.cache.deleteMany({});
      return true;
    } catch {
      return false;
    }
  }

  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  async many<T = any>(keys: string[]): Promise<Record<string, T | null>> {
    const result: Record<string, T | null> = {};
    for (const key of keys) {
      result[key] = await this.get<T>(key);
    }
    return result;
  }

  async putMany<T = any>(
    values: Record<string, T>,
    ttl?: number,
  ): Promise<boolean> {
    for (const [key, value] of Object.entries(values)) {
      await this.put(key, value, ttl);
    }
    return true;
  }

  async increment(key: string, value: number = 1): Promise<number | false> {
    const current = await this.get<number>(key);
    const newValue = (current ?? 0) + value;
    const success = await this.put(key, newValue);
    return success ? newValue : false;
  }

  async decrement(key: string, value: number = 1): Promise<number | false> {
    return this.increment(key, -value);
  }
}

// Redis Store
class RedisStore implements CacheStore {
  private client: any;
  private connected: boolean = false;

  constructor() {
    this.initRedis();
  }

  private async initRedis() {
    if (!this.client) {
      const { createClient } = await import("redis");
      const redisConfig = config.services.redis;
      this.client = createClient({
        url: `redis://${redisConfig.username ? `${redisConfig.username}:${redisConfig.password}@` : ""}${redisConfig.host}:${redisConfig.port}`,
      });
      this.client.on("error", (err: any) =>
        console.error("Redis Client Error", err),
      );
    }
  }

  private async ensureConnected() {
    if (!this.client) {
      await this.initRedis();
    }
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    await this.ensureConnected();
    try {
      const value = await this.client.get(key);
      if (!value) return null;
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  async put<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    await this.ensureConnected();
    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await this.client.setEx(key, ttl, serialized);
      } else {
        await this.client.set(key, serialized);
      }
      return true;
    } catch {
      return false;
    }
  }

  async forget(key: string): Promise<boolean> {
    await this.ensureConnected();
    try {
      await this.client.del(key);
      return true;
    } catch {
      return false;
    }
  }

  async flush(): Promise<boolean> {
    await this.ensureConnected();
    try {
      await this.client.flushDb();
      return true;
    } catch {
      return false;
    }
  }

  async has(key: string): Promise<boolean> {
    await this.ensureConnected();
    try {
      return (await this.client.exists(key)) === 1;
    } catch {
      return false;
    }
  }

  async many<T = any>(keys: string[]): Promise<Record<string, T | null>> {
    await this.ensureConnected();
    const result: Record<string, T | null> = {};
    try {
      const values = await this.client.mGet(keys);
      keys.forEach((key, index) => {
        result[key] = values[index] ? JSON.parse(values[index]) : null;
      });
    } catch {
      keys.forEach((key) => (result[key] = null));
    }
    return result;
  }

  async putMany<T = any>(
    values: Record<string, T>,
    ttl?: number,
  ): Promise<boolean> {
    await this.ensureConnected();
    try {
      const multi = this.client.multi();
      for (const [key, value] of Object.entries(values)) {
        const serialized = JSON.stringify(value);
        if (ttl) {
          multi.setEx(key, ttl, serialized);
        } else {
          multi.set(key, serialized);
        }
      }
      await multi.exec();
      return true;
    } catch {
      return false;
    }
  }

  async increment(key: string, value: number = 1): Promise<number | false> {
    await this.ensureConnected();
    try {
      if (value === 1) {
        return await this.client.incr(key);
      }
      return await this.client.incrBy(key, value);
    } catch {
      return false;
    }
  }

  async decrement(key: string, value: number = 1): Promise<number | false> {
    await this.ensureConnected();
    try {
      if (value === 1) {
        return await this.client.decr(key);
      }
      return await this.client.decrBy(key, value);
    } catch {
      return false;
    }
  }
}

// Cache Manager
class CacheManager {
  private stores: Map<string, CacheStore> = new Map();
  private defaultStore: string;
  private prefix: string;

  constructor() {
    this.defaultStore = config.cache.store;
    this.prefix = config.cache.prefix;
  }

  private prefixKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private createStore(name: string): CacheStore {
    switch (name) {
      case "inmemory":
        return new InMemoryStore();
      case "database":
        return new DatabaseStore();
      case "redis":
        return new RedisStore();
      default:
        throw new Error(`Cache store [${name}] is not supported.`);
    }
  }

  store(name?: string): CacheStore {
    const storeName = name ?? this.defaultStore;

    if (!this.stores.has(storeName)) {
      this.stores.set(storeName, this.createStore(storeName));
    }

    return this.stores.get(storeName)!;
  }

  async get<T = any>(key: string, defaultValue?: T): Promise<T | null> {
    const value = await this.store().get<T>(this.prefixKey(key));
    return value ?? defaultValue ?? null;
  }

  async put<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    return this.store().put(this.prefixKey(key), value, ttl);
  }

  async set<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    return this.put(key, value, ttl);
  }

  async forget(key: string): Promise<boolean> {
    return this.store().forget(this.prefixKey(key));
  }

  async delete(key: string): Promise<boolean> {
    return this.forget(key);
  }

  async flush(): Promise<boolean> {
    return this.store().flush();
  }

  async clear(): Promise<boolean> {
    return this.flush();
  }

  async has(key: string): Promise<boolean> {
    return this.store().has(this.prefixKey(key));
  }

  async missing(key: string): Promise<boolean> {
    return !(await this.has(key));
  }

  async many<T = any>(keys: string[]): Promise<Record<string, T | null>> {
    const prefixedKeys = keys.map((k) => this.prefixKey(k));
    const result = await this.store().many<T>(prefixedKeys);

    // Remove prefix from keys in result
    const unprefixedResult: Record<string, T | null> = {};
    keys.forEach((key) => {
      unprefixedResult[key] = result[this.prefixKey(key)];
    });
    return unprefixedResult;
  }

  async putMany<T = any>(
    values: Record<string, T>,
    ttl?: number,
  ): Promise<boolean> {
    const prefixedValues: Record<string, T> = {};
    for (const [key, value] of Object.entries(values)) {
      prefixedValues[this.prefixKey(key)] = value;
    }
    return this.store().putMany(prefixedValues, ttl);
  }

  async increment(key: string, value?: number): Promise<number | false> {
    return this.store().increment(this.prefixKey(key), value);
  }

  async decrement(key: string, value?: number): Promise<number | false> {
    return this.store().decrement(this.prefixKey(key), value);
  }

  async remember<T = any>(
    key: string,
    ttl: number,
    callback: () => T | Promise<T>,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await callback();
    await this.put(key, value, ttl);
    return value;
  }

  async rememberForever<T = any>(
    key: string,
    callback: () => T | Promise<T>,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await callback();
    await this.put(key, value);
    return value;
  }

  async pull<T = any>(key: string): Promise<T | null> {
    const value = await this.get<T>(key);
    await this.forget(key);
    return value;
  }

  async add<T = any>(key: string, value: T, ttl?: number): Promise<boolean> {
    if (await this.has(key)) {
      return false;
    }
    return this.put(key, value, ttl);
  }

  async forever<T = any>(key: string, value: T): Promise<boolean> {
    return this.put(key, value);
  }
}

// Singleton instance
const cacheManager = new CacheManager();

// Export facade-style functions
export const Cache = {
  store: (name?: string) => cacheManager.store(name),
  get: <T = any>(key: string, defaultValue?: T) =>
    cacheManager.get<T>(key, defaultValue),
  put: <T = any>(key: string, value: T, ttl?: number) =>
    cacheManager.put(key, value, ttl),
  set: <T = any>(key: string, value: T, ttl?: number) =>
    cacheManager.set(key, value, ttl),
  forget: (key: string) => cacheManager.forget(key),
  delete: (key: string) => cacheManager.delete(key),
  flush: () => cacheManager.flush(),
  clear: () => cacheManager.clear(),
  has: (key: string) => cacheManager.has(key),
  missing: (key: string) => cacheManager.missing(key),
  many: <T = any>(keys: string[]) => cacheManager.many<T>(keys),
  putMany: <T = any>(values: Record<string, T>, ttl?: number) =>
    cacheManager.putMany(values, ttl),
  increment: (key: string, value?: number) =>
    cacheManager.increment(key, value),
  decrement: (key: string, value?: number) =>
    cacheManager.decrement(key, value),
  remember: <T = any>(
    key: string,
    ttl: number,
    callback: () => T | Promise<T>,
  ) => cacheManager.remember(key, ttl, callback),
  rememberForever: <T = any>(key: string, callback: () => T | Promise<T>) =>
    cacheManager.rememberForever(key, callback),
  pull: <T = any>(key: string) => cacheManager.pull<T>(key),
  add: <T = any>(key: string, value: T, ttl?: number) =>
    cacheManager.add(key, value, ttl),
  forever: <T = any>(key: string, value: T) => cacheManager.forever(key, value),
};

export default Cache;
