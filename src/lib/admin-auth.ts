import { useSyncExternalStore } from "react";
import { loginAdmin, verifyAdminSession } from "@/lib/cms.functions";

const STORAGE_KEY = "iz-admin-auth-v1";
const TOKEN_KEY = "iz-admin-token-v1";
// NOTE: simple gate as requested — not for sensitive data.
// Default password — admin can change via env or by editing this constant.
export const ADMIN_PASSWORD = "izadmin2025";

let authed = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) === "1";
const listeners = new Set<() => void>();
let verifyPromise: Promise<boolean> | null = null;
let lastVerifiedAt = 0;

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
  async login(password: string) {
    try {
      const result = await loginAdmin({ data: { password } });
      if (!result.ok) return false;
      authed = true;
      lastVerifiedAt = Date.now();
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
        window.localStorage.setItem(TOKEN_KEY, result.token);
      } catch {
        /* ignore */
      }
      emit();
      return true;
    } catch {
      return false;
    }
  },
  logout() {
    authed = false;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    emit();
  },
  async verify() {
    if (typeof window === "undefined") return false;
    if (lastVerifiedAt && Date.now() - lastVerifiedAt < 60_000) return authed;
    if (verifyPromise) return verifyPromise;
    const token = window.localStorage.getItem(TOKEN_KEY);
    verifyPromise = verifyAdminSession({ data: { token } })
      .then((result) => {
        authed = result.ok;
        lastVerifiedAt = result.ok ? Date.now() : 0;
        if (!result.ok) {
          window.localStorage.removeItem(STORAGE_KEY);
          window.localStorage.removeItem(TOKEN_KEY);
        }
        emit();
        return result.ok;
      })
      .catch(() => authed)
      .finally(() => {
        verifyPromise = null;
      });
    return verifyPromise;
  },
};

export function useAdminAuth() {
  return useSyncExternalStore(
    adminAuth.subscribe,
    adminAuth.getSnapshot,
    adminAuth.getServerSnapshot,
  );
}
