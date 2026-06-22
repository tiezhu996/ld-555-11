type SafeOperation<T> = () => Promise<T>;

export async function withFriendlyError<T>(operation: SafeOperation<T>, fallbackMessage = '本地数据操作失败，请稍后重试。'): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    window.dispatchEvent(new CustomEvent('ggarena:error', { detail: fallbackMessage }));
    throw error;
  }
}

export function readLocalValue<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    window.dispatchEvent(new CustomEvent('ggarena:error', { detail: '本地偏好读取失败，已使用默认设置。' }));
    return fallback;
  }
}

export function writeLocalValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    window.dispatchEvent(new CustomEvent('ggarena:error', { detail: '本地偏好保存失败。' }));
  }
}
