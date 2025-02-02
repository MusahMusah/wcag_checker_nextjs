export class LocalStorageHelper {
  static save<T>(key: string, data: T): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  static get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static remove(key: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}
