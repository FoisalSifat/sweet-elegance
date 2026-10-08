import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cartStore, useCart } from "@/lib/cart-store";
import { useCms } from "@/lib/cms-store";
import { AnnouncementBar } from "@/components/announcement-bar";
import izLogo from "@/assets/iz-logo.webp";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cart = useCart();
  const { products } = useCms();
  const totalQty = cart.items.reduce((a, b) => a + b.qty, 0);

  const results = query.trim()
    ? products
        .filter((p) =>
          `${p.name} ${p.category}`.toLowerCase().includes(query.trim().toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    if (!searchOpen) return;
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [searchOpen]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ease-out ${
        scrolled
          ? "border-b border-border shadow-[0_18px_45px_-30px_var(--cocoa)]"
          : "border-b border-border/40"
      }`}
    >
      <AnnouncementBar />
      <div
        className={`container mx-auto px-3 xs:px-4 sm:px-6 flex items-center justify-between gap-2 transition-[height] duration-500 ease-out ${
          scrolled ? "h-14 xs:h-16 sm:h-20 lg:h-24" : "h-16 xs:h-20 sm:h-24 lg:h-28"
        }`}
      >
        <button
          className="md:hidden p-1.5 -ml-1.5 text-cocoa shrink-0"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center group min-w-0" aria-label="IZ Patisserie & Cafe — Home">
          <img
            src={izLogo}
            alt="IZ Patisserie & Cafe"
            width={240}
            height={96}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={`w-auto max-w-[140px] xs:max-w-[190px] sm:max-w-[260px] object-contain transition-[height,transform,filter] duration-500 ease-out group-hover:scale-[1.02] ${
              scrolled ? "h-10 xs:h-12 sm:h-16 lg:h-20" : "h-12 xs:h-16 sm:h-20 lg:h-24"
            }`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
                className="text-sm tracking-wide text-foreground/80 hover:text-cocoa relative transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-cocoa after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 shrink-0">
          <div className="relative" ref={searchRef}>
            <button
              className="p-1.5 xs:p-2 hover:text-cocoa transition"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
            >
              <Search className="w-4 h-4 xs:w-5 xs:h-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 xs:w-80 rounded-xl border border-border bg-card shadow-elegant overflow-hidden animate-fade-up">
                <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search coffee, cakes, desserts..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
                {query.trim() && (
                  <div className="max-h-72 overflow-y-auto">
                    {results.length === 0 ? (
                      <p className="px-4 py-6 text-sm text-muted-foreground text-center">
                        No items found for “{query.trim()}”
                      </p>
                    ) : (
                      results.map((p) => (
                        <button
                          key={p.slug}
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery("");
                            navigate({ to: "/product/$slug", params: { slug: p.slug } });
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-accent/60 transition text-left"
                        >
                          <img
                            src={p.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm text-foreground truncate">{p.name}</span>
                            <span className="block text-xs text-muted-foreground">{p.category}</span>
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <button className="p-2 hover:text-cocoa transition hidden sm:inline-flex" aria-label="Account">
            <User className="w-5 h-5" />
          </button>
          <button
            onClick={() => cartStore.setOpen(true)}
            className="p-1.5 xs:p-2 hover:text-cocoa transition relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4 xs:w-5 xs:h-5" />
            {totalQty > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-cocoa text-cocoa-foreground text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-cocoa/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 bg-background p-6 transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-serif text-xl text-cocoa">Menu</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-serif text-foreground hover:text-cocoa"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
