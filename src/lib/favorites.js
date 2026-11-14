import { useSyncExternalStore } from 'react';

const KEY = 'mdd.favorites.v1';
const listeners = new Set();
let cache = null;

function read() {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    cache = [];
  }
  return cache;
}

function write(next) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: keep in memory */
  }
  listeners.forEach((l) => l());
}

export function toggleFavorite(id) {
  const list = read();
  write(list.includes(id) ? list.filter((x) => x !== id) : [id, ...list]);
}

export function useFavorites() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    read,
    read,
  );
}
