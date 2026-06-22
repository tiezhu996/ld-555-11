const DB_NAME = 'ggarena-db';
const DB_VERSION = 1;
const STORES = ['teams', 'tournaments', 'players', 'matches'] as const;

type StoreName = (typeof STORES)[number];

let dbPromise: Promise<IDBDatabase> | null = null;

function openDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      STORES.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' });
        }
      });
    };
  });
  return dbPromise;
}

async function transaction<T>(storeName: StoreName, mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    const request = action(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllRecords<T>(storeName: StoreName): Promise<T[]> {
  return transaction<T[]>(storeName, 'readonly', (store) => store.getAll() as IDBRequest<T[]>);
}

export async function putRecord<T extends { id: string }>(storeName: StoreName, record: T): Promise<T> {
  await transaction<IDBValidKey>(storeName, 'readwrite', (store) => store.put(record));
  return record;
}

export async function putManyRecords<T extends { id: string }>(storeName: StoreName, records: T[]): Promise<T[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    records.forEach((record) => store.put(record));
    tx.oncomplete = () => resolve(records);
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteRecord(storeName: StoreName, id: string): Promise<void> {
  await transaction<undefined>(storeName, 'readwrite', (store) => store.delete(id));
}
