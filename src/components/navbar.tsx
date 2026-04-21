import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cartStore, useCart } from "@/lib/cart-store";
import izLogo from "@/assets/iz-logo.jpg";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Cakes", search: { category: "Cakes" } },
  { to: "/custom-cake", label: "Custom Orders" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useCart();
  const totalQty = cart.items.reduce((a, b) => a + b.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-soft"
          : "bg-background/0"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <button
          className="md:hidden p-2 -ml-2 text-cocoa"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={izLogo}
            alt="IZ Patisserie & Cafe"
            className="h-10 sm:h-12 w-auto rounded-sm object-contain mix-blend-multiply"
          />
          <span className="hidden sm:inline font-serif text-xl lg:text-2xl tracking-tight text-cocoa">
            IZ <span className="italic font-light">Patisserie</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm tracking-wide text-foreground/80 hover:text-cocoa relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-cocoa after:transition-all hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2 hover:text-cocoa transition" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:text-cocoa transition hidden sm:inline-flex" aria-label="Account">
            <User className="w-5 h-5" />
          </button>
          <button
            onClick={() => cartStore.setOpen(true)}
            className="p-2 hover:text-cocoa transition relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
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
