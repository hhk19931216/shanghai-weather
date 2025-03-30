
interface CacheItem {
    data: any;
    timestamp: number;
    ttl?: number; // 可选的时间存活(毫秒)
}

class CacheService {
    private cache: Record<string, CacheItem> = {};
    private defaultTTL = 5 * 60 * 1000; // 默认缓存5分钟

    get(key: string): any | null {
        const item = this.cache[key];
        if (!item) return null;

        // 检查是否过期
        if (item.ttl && Date.now() - item.timestamp > item.ttl) {
            delete this.cache[key];
            return null;
        }

        return item.data;
    }

    set(key: string, data: any, ttl?: number): void {
        this.cache[key] = {
            data,
            timestamp: Date.now(),
            ttl: ttl || this.defaultTTL,
        };
    }

    delete(key: string): void {
        delete this.cache[key];
    }

    clear(): void {
        this.cache = {};
    }
}

export const cacheService = new CacheService();