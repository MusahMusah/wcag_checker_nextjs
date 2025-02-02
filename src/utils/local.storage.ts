export class LocalStorageHelper {
  static save<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
