import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, ArrowRight } from "lucide-react";
import izLogo from "@/assets/iz-logo.jpg";

export function Footer() {
  return (
    <footer className="bg-cream border-t border-border mt-8">
      <div className="container mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <img
            src={izLogo}
            alt="IZ Patisserie & Cafe"
            className="h-16 w-auto mb-4 rounded-sm object-contain mix-blend-multiply"
          />
          <h3 className="font-serif text-2xl text-cocoa mb-3">
            IZ <span className="italic font-light">Patisserie & Cafe</span>
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-xs">
            Crafting moments of pure indulgence through artisanal baking and high-end culinary artistry.
          </p>
          <div className="flex gap-2 mt-5">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-cocoa/15 flex items-center justify-center text-cocoa hover:bg-cocoa hover:text-cocoa-foreground transition"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.22em] uppercase text-cocoa/60 mb-4">Experience</h4>
          <ul className="space-y-2.5 text-sm text-foreground/75">
            <li><Link to="/shop" className="hover:text-cocoa">Shop All</Link></li>
            <li><Link to="/shop" className="hover:text-cocoa">Seasonal Menu</Link></li>
            <li><Link to="/about" className="hover:text-cocoa">Our Story</Link></li>
            <li><a href="#" className="hover:text-cocoa">The Gallery</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.22em] uppercase text-cocoa/60 mb-4">Support</h4>
          <ul className="space-y-2.5 text-sm text-foreground/75">
            <li><a href="#" className="hover:text-cocoa">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-cocoa">Wholesale</a></li>
            <li><Link to="/contact" className="hover:text-cocoa">Contact Us</Link></li>
            <li><a href="#" className="hover:text-cocoa">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-[0.22em] uppercase text-cocoa/60 mb-4">Stay Inspired</h4>
          <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
            Join our mailing list for secret drops and seasonal previews.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-card border border-cocoa/15 rounded-full px-4 py-2.5 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-cocoa/50"
            />
            <button
              aria-label="Subscribe"
              className="bg-cocoa text-cocoa-foreground w-10 h-10 shrink-0 rounded-full flex items-center justify-center hover:opacity-90 transition"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>© {new Date().getFullYear()} IZ Patisserie & Cafe. Crafted with skill and visuals.</p>
          <div className="flex gap-5 tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-cocoa">Twitter</a>
            <a href="#" className="hover:text-cocoa">Instagram</a>
            <a href="#" className="hover:text-cocoa">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
