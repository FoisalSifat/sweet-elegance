import { useSyncExternalStore } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  flavor: string;
  qty: number;
};

type State = {
  items: CartItem[];
  open: boolean;
};

let state: State = { items: [], open: false };
const listeners = new Set<() => void>();

function setState(updater: (s: State) => State) {
  state = updater(state);
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return state;
  },
  add(item: CartItem) {
    setState((s) => {
      const key = `${item.slug}-${item.size}-${item.flavor}`;
      const existing = s.items.find((i) => `${i.slug}-${i.size}-${i.flavor}` === key);
      if (existing) {
        return {
          ...s,
          open: true,
          items: s.items.map((i) =>
            `${i.slug}-${i.size}-${i.flavor}` === key ? { ...i, qty: i.qty + item.qty } : i
          ),
        };
      }
      return { ...s, open: true, items: [...s.items, item] };
    });
  },
  updateQty(key: string, qty: number) {
    setState((s) => ({
      ...s,
      items: s.items
        .map((i) => (`${i.slug}-${i.size}-${i.flavor}` === key ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    }));
  },
  remove(key: string) {
    setState((s) => ({
      ...s,
      items: s.items.filter((i) => `${i.slug}-${i.size}-${i.flavor}` !== key),
    }));
  },
  setOpen(open: boolean) {
    setState((s) => ({ ...s, open }));
  },
};

export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot);
}

export function itemKey(i: CartItem) {
  return `${i.slug}-${i.size}-${i.flavor}`;
}
