type CacheItem<T> = {
  data: T;
  timestamp: number;
};

class CacheService {
  private static instance: CacheService;
  private cache: Map<string, CacheItem<unknown>>;
  private readonly DEFAULT_EXPIRY = 5 * 60 * 1000;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public set<T>(
    key: string,
    data: T,
    expiryTime: number = this.DEFAULT_EXPIRY
  ): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + expiryTime
    });
  }

  public get<T>(key: string, forceRefresh: boolean = false): T | null {
    if (forceRefresh) {
      this.cache.delete(key);
      return null;
    }

    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  public clear(): void {
    this.cache.clear();
  }

  public remove(key: string): void {
    this.cache.delete(key);
  }
}

export const cacheService = CacheService.getInstance();
