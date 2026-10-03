import { useSyncExternalStore } from "react";

type Key = "fav" | "compare";
const listeners = new Set<() => void>();
const cache: Record<string, string[]> = {};
const EMPTY: string[] = [];

function read(key: Key): string[] {
  if (cache[key]) return cache[key];
  try {
    cache[key] = JSON.parse(localStorage.getItem("pa_" + key) || "[]");
  } catch {
    cache[key] = [];
  }
  return cache[key] ?? EMPTY;
}
function write(key: Key, v: string[]) {
  cache[key] = v;
  localStorage.setItem("pa_" + key, JSON.stringify(v));
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useList(key: Key) {
  const list = useSyncExternalStore(subscribe, () => read(key), () => EMPTY);
  const toggle = (id: string) => {
    const cur = read(key);
    if (cur.includes(id)) return write(key, cur.filter((x) => x !== id));
    if (key === "compare" && cur.length >= 3) return write(key, [...cur.slice(1), id]);
    write(key, [...cur, id]);
  };
  const remove = (id: string) => write(key, read(key).filter((x) => x !== id));
  return { list, has: (id: string) => list.includes(id), toggle, remove };
}
// ids are "brand/slug"
export const pid = (p: { brand: string; slug: string }) => `${p.brand}/${p.slug}`;
