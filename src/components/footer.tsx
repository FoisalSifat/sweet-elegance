import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cocoa text-cocoa-foreground mt-24">
      <div className="container mx-auto px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="font-serif text-3xl mb-3">
            IZ <span className="italic font-light">Patisserie</span>
          </h3>
          <p className="text-sm text-cocoa-foreground/70 leading-relaxed">
            Boutique desserts, hand-crafted daily with love and the finest ingredients.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-cocoa transition"
                aria-label="Social link"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm text-cocoa-foreground/70">
            <li><Link to="/shop" className="hover:text-cream">All Desserts</Link></li>
            <li><Link to="/shop" className="hover:text-cream">Cakes</Link></li>
            <li><Link to="/shop" className="hover:text-cream">Brownies</Link></li>
            <li><Link to="/custom-cake" className="hover:text-cream">Custom Orders</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Care</h4>
          <ul className="space-y-2.5 text-sm text-cocoa-foreground/70">
            <li><Link to="/about" className="hover:text-cream">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-cream">Contact</Link></li>
            <li><a href="#" className="hover:text-cream">Delivery</a></li>
            <li><a href="#" className="hover:text-cream">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-4">Sweet Letters</h4>
          <p className="text-sm text-cocoa-foreground/70 mb-4">
            New drops, recipes, and a little love in your inbox.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-cream/30 rounded-full px-4 py-2.5 text-sm placeholder:text-cocoa-foreground/40 focus:outline-none focus:border-cream"
            />
            <button className="bg-cream text-cocoa px-4 py-2.5 rounded-full text-sm font-medium hover:bg-blush transition">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cocoa-foreground/50">
        © {new Date().getFullYear()} IZ Patisserie & Cafe. Crafted with love.
      </div>
    </footer>
  );
}
