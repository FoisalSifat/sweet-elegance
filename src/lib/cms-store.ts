import { useSyncExternalStore } from "react";
import { products as defaultProducts, type Product } from "@/lib/products";
import heroCake from "@/assets/iz-hero-cake.jpg";
import heroPastries from "@/assets/iz-macarons.jpg";
import heroInterior from "@/assets/iz-interior.jpg";
import { idbGet, idbSet } from "@/lib/cms-storage";
import {
  getCmsState,
  removeOrderRecord,
  removeProductRecord,
  removeSlideRecord,
  saveOrderRecord,
  saveProductRecord,
  saveSettingsRecord,
  saveSlideOrder,
  saveSlideRecord,
  updateOrderStatusRecord,
} from "@/lib/cms-functions";

export type HeroSlide = {
  id: string;
  image: string;
  /** Optional background video URL (mp4/webm). When set, plays muted+looped over the image. */
  video?: string;
  eyebrow: string;
  title: string;
  sub: string;
};

export type Order = {
  id: string;
  createdAt: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  notes: string;
  payment: string;
  items: { name: string; qty: number; price: number; size: string; flavor: string }[];
  subtotal: number;
  delivery: number;
  total: number;
  status: "new" | "preparing" | "delivered" | "cancelled";
};

export type SiteSettings = {
  announcements: string[];
  contact: {
    address: string;
    phone: string;
    hours: string;
    email: string;
    secondaryEmail: string;
  };
  footerTagline: string;
  socials: { instagram: string; facebook: string; email: string };
};

type State = {
  products: Product[];
  slides: HeroSlide[];
  settings: SiteSettings;
  orders: Order[];
};

const STORAGE_KEY = "iz-cms-v1";
const ADMIN_TOKEN_KEY = "iz-admin-token-v1";

const defaultSlides: HeroSlide[] = [
  {
    id: "s1",
    image: heroCake,
    eyebrow: "Signature Collection",
    title: "Where Pâtisserie\nMeets Poetry.",
    sub: "Hand-crafted French desserts, baked fresh each morning. A Mirpur landmark since 2023.",
  },
  {
    id: "s2",
    image: heroInterior,
    eyebrow: "Visit the Café",
    title: "A Cosy Corner of\nVictorian Charm.",
    sub: "Velvet seating, golden mirrors, and the scent of fresh espresso. Mirpur-12, beside Pallabi metro.",
  },
  {
    id: "s3",
    image: heroPastries,
    eyebrow: "New This Season",
    title: "Pastel Macarons\nin Every Hue.",
    sub: "Delicate French shells, silky ganache. Plated like little works of art.",
  },
];

const defaultSettings: SiteSettings = {
  announcements: [
    "✨ Same day delivery available",
    "🍰 Freshly baked every morning",
    "🎁 Complimentary gift wrap on orders over ৳2000",
    "💌 Personalised notes for every cake",
  ],
  contact: {
    address: "House 12, Road 5, Banani\nDhaka, Bangladesh",
    phone: "+880 1700 000 000",
    hours: "Daily 9am — 10pm",
    email: "hello@izpatisserie.com",
    secondaryEmail: "orders@izpatisserie.com",
  },
  footerTagline:
    "Crafting moments of pure indulgence through artisanal baking and high-end culinary artistry.",
  socials: {
    instagram: "https://www.instagram.com/izpatisserieandcafe/",
    facebook: "https://www.facebook.com/IZPatisserieandCafe/",
    email: "mailto:hello@izpatisserie.com",
  },
};

const defaultState: State = {
  products: defaultProducts,
  slides: defaultSlides,
  settings: defaultSettings,
  orders: [],
};

function mergeWithDefaults(parsed: Partial<State>): State {
  return {
    products: parsed.products?.length ? parsed.products : defaultState.products,
    slides: parsed.slides?.length ? parsed.slides : defaultState.slides,
    settings: { ...defaultState.settings, ...(parsed.settings || {}) },
    orders: parsed.orders || [],
  };
}

function loadInitialSync(): State {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return mergeWithDefaults(JSON.parse(raw) as Partial<State>);
  } catch {
    return defaultState;
  }
}

let state: State = loadInitialSync();
const listeners = new Set<() => void>();

// Hydrate from IndexedDB (handles large image/video data URLs that exceed
// the localStorage quota). Once hydrated, future writes go to IDB primarily
// with a best-effort localStorage mirror for fast initial paint.
if (typeof window !== "undefined") {
  void idbGet<State>(STORAGE_KEY).then((stored) => {
    if (!stored) return;
    state = mergeWithDefaults(stored);
    listeners.forEach((l) => l());
  });
}

function getAdminToken() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

async function syncFromCloud() {
  if (typeof window === "undefined") return;
  try {
    const remote = await getCmsState({ data: { adminToken: getAdminToken() } });
    state = mergeWithDefaults(remote);
    await idbSet(STORAGE_KEY, state);
    listeners.forEach((l) => l());
  } catch {
    // Keep the local fallback usable if the network is temporarily unavailable.
  }
}

if (typeof window !== "undefined") {
  void syncFromCloud();
}

let persistTimer: ReturnType<typeof setTimeout> | null = null;
function persist() {
  if (typeof window === "undefined") return;
  // Debounce to avoid hammering IDB on rapid edits.
  if (persistTimer) clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    void idbSet(STORAGE_KEY, state);
    // Mirror a lightweight copy to localStorage for synchronous initial paint.
    // Strip out heavy data URLs (>200KB) so we never blow the quota.
    try {
      const slim: State = {
        ...state,
        products: state.products.map((p) =>
          isHeavy(p.image) ? { ...p, image: "" } : p,
        ),
        slides: state.slides.map((s) => ({
          ...s,
          image: isHeavy(s.image) ? "" : s.image,
          video: isHeavy(s.video) ? undefined : s.video,
        })),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
    } catch {
      /* localStorage quota — IDB still has the full copy */
    }
  }, 120);
}

function isHeavy(url?: string) {
  return !!url && url.startsWith("data:") && url.length > 200_000;
}

function setState(updater: (s: State) => State) {
  state = updater(state);
  persist();
  listeners.forEach((l) => l());
}

const serverSnapshot: State = defaultState;

export const cmsStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return state;
  },
  getServerSnapshot() {
    return serverSnapshot;
  },

  // Products
  upsertProduct(p: Product) {
    setState((s) => {
      const exists = s.products.some((x) => x.slug === p.slug);
      return {
        ...s,
        products: exists
          ? s.products.map((x) => (x.slug === p.slug ? p : x))
          : [p, ...s.products],
      };
    });
    void saveProductRecord({ data: { adminToken: getAdminToken(), product: p } }).then(syncFromCloud);
  },
  removeProduct(slug: string) {
    setState((s) => ({ ...s, products: s.products.filter((p) => p.slug !== slug) }));
    void removeProductRecord({ data: { adminToken: getAdminToken(), slug } });
  },

  // Slides
  upsertSlide(slide: HeroSlide) {
    let sortOrder = 0;
    setState((s) => {
      const exists = s.slides.some((x) => x.id === slide.id);
      sortOrder = exists ? s.slides.findIndex((x) => x.id === slide.id) : s.slides.length;
      return {
        ...s,
        slides: exists
          ? s.slides.map((x) => (x.id === slide.id ? slide : x))
          : [...s.slides, slide],
      };
    });
    void saveSlideRecord({ data: { adminToken: getAdminToken(), slide, sortOrder } }).then(syncFromCloud);
  },
  removeSlide(id: string) {
    setState((s) => ({ ...s, slides: s.slides.filter((x) => x.id !== id) }));
    void removeSlideRecord({ data: { adminToken: getAdminToken(), id } });
  },
  moveSlide(id: string, dir: -1 | 1) {
    let ids: string[] = [];
    setState((s) => {
      const idx = s.slides.findIndex((x) => x.id === id);
      const next = idx + dir;
      if (idx < 0 || next < 0 || next >= s.slides.length) return s;
      const arr = [...s.slides];
      const [item] = arr.splice(idx, 1);
      arr.splice(next, 0, item);
      ids = arr.map((x) => x.id);
      return { ...s, slides: arr };
    });
    if (ids.length) void saveSlideOrder({ data: { adminToken: getAdminToken(), ids } });
  },

  // Settings
  updateSettings(patch: Partial<SiteSettings>) {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
    void saveSettingsRecord({ data: { adminToken: getAdminToken(), settings: state.settings } });
  },

  // Orders
  addOrder(o: Order) {
    setState((s) => ({ ...s, orders: [o, ...s.orders] }));
    void saveOrderRecord({ data: { order: o } });
  },
  setOrderStatus(id: string, status: Order["status"]) {
    setState((s) => ({
      ...s,
      orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
    void updateOrderStatusRecord({ data: { adminToken: getAdminToken(), id, status } });
  },
  removeOrder(id: string) {
    setState((s) => ({ ...s, orders: s.orders.filter((o) => o.id !== id) }));
    void removeOrderRecord({ data: { adminToken: getAdminToken(), id } });
  },

  resetAll() {
    setState(() => defaultState);
  },
};

export function useCms() {
  return useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getSnapshot,
    cmsStore.getServerSnapshot,
  );
}

// File -> dataURL helper for image uploads in admin
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
