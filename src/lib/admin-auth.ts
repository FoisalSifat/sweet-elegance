import { useSyncExternalStore } from "react";

const STORAGE_KEY = "iz-admin-auth-v1";
// NOTE: simple gate as requested — not for sensitive data.
// Default password — admin can change via env or by editing this constant.
export const ADMIN_PASSWORD = "izadmin2025";

let authed = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const adminAuth = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot() {
    return authed;
  },
  getServerSnapshot() {
    return false;
  },
  login(password: string) {
    if (password === ADMIN_PASSWORD) {
      authed = true;
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      emit();
      return true;
    }
    return false;
  },
  logout() {
    authed = false;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    emit();
  },
};

export function useAdminAuth() {
  return useSyncExternalStore(
    adminAuth.subscribe,
    adminAuth.getSnapshot,
    adminAuth.getServerSnapshot,
  );
}
