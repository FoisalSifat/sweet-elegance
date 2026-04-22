import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Images,
  Settings as SettingsIcon,
  ShoppingCart,
  LogOut,
  ExternalLink,
  Lock,
} from "lucide-react";
import { adminAuth, useAdminAuth } from "@/lib/admin-auth";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · IZ Patisserie" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminShell,
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/banners", label: "Hero Slides", icon: Images },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/settings", label: "Site Settings", icon: SettingsIcon },
] as const;

function AdminShell() {
  const authed = useAdminAuth();
  if (!authed) return <AdminLogin />;
  return <AdminLayout />;
}

function AdminLogin() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminAuth.login(pw)) {
      setErr(false);
      navigate({ to: "/admin" });
    } else {
      setErr(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-blush/30 flex items-center justify-center p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-card rounded-3xl border border-border shadow-elegant p-8"
      >
        <div className="w-12 h-12 rounded-full bg-cocoa text-cocoa-foreground flex items-center justify-center mb-5">
          <Lock className="w-5 h-5" />
        </div>
        <h1 className="font-serif text-2xl text-cocoa">Admin Access</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Restricted area. Enter the admin password.
        </p>

        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            if (err) setErr(false);
          }}
          placeholder="Password"
          className={`mt-6 w-full px-4 py-3 rounded-xl border bg-background text-sm outline-none transition ${
            err ? "border-destructive" : "border-border focus:border-cocoa"
          }`}
        />
        {err && (
          <p className="mt-2 text-xs text-destructive">Incorrect password.</p>
        )}

        <button
          type="submit"
          className="mt-5 w-full bg-cocoa text-cocoa-foreground py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          Sign in
        </button>

        <Link
          to="/"
          className="mt-4 block text-center text-xs text-muted-foreground hover:text-cocoa"
        >
          ← Back to site
        </Link>
      </form>
    </div>
  );
}

function AdminLayout() {
  const location = useLocation();
  const { orders } = useCms();
  const newOrders = orders.filter((o) => o.status === "new").length;
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-cocoa text-cocoa-foreground flex flex-col transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 pt-7 pb-6 border-b border-cocoa-foreground/10">
          <p className="text-[10px] tracking-[0.32em] uppercase opacity-70">
            IZ Patisserie
          </p>
          <h2 className="font-serif text-2xl mt-1">Admin Panel</h2>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {nav.map(({ to, label, icon: Icon, exact }) => {
            const active = exact
              ? location.pathname === to
              : location.pathname === to || location.pathname.startsWith(`${to}/`);
            const badge = label === "Orders" && newOrders > 0 ? newOrders : null;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
                  active
                    ? "bg-cream text-cocoa font-medium"
                    : "hover:bg-cocoa-foreground/10"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
                {badge && (
                  <span className="bg-rose-gold text-cocoa text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5 space-y-1 border-t border-cocoa-foreground/10 pt-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm hover:bg-cocoa-foreground/10"
          >
            <ExternalLink className="w-4 h-4" /> View site
          </a>
          <button
            onClick={() => adminAuth.logout()}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm hover:bg-cocoa-foreground/10"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-cocoa/60 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-background border-b border-border h-16 flex items-center px-4 sm:px-8 sticky top-0 z-20">
          <button
            className="lg:hidden mr-3 p-2 -ml-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-0.5 bg-cocoa mb-1.5" />
            <span className="block w-5 h-0.5 bg-cocoa mb-1.5" />
            <span className="block w-5 h-0.5 bg-cocoa" />
          </button>
          <h1 className="font-serif text-lg sm:text-xl text-cocoa">
            {nav.find(
              (n) =>
                n.to === location.pathname ||
                (!n.exact && location.pathname.startsWith(`${n.to}/`)),
            )?.label ?? "Dashboard"}
          </h1>
        </header>
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
