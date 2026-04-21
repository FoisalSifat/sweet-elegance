import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/products";
import heroCake from "@/assets/hero-cake.jpg";
import heroBrownies from "@/assets/hero-brownies.jpg";
import heroPastries from "@/assets/hero-pastries.jpg";
import customBg from "@/assets/custom-cake-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IZ Patisserie & Cafe — Luxury Desserts, Made Fresh" },
      {
        name: "description",
        content:
          "Boutique patisserie crafting elegant cakes, brownies, macarons and gift boxes. Same-day delivery & custom orders.",
      },
      { property: "og:title", content: "IZ Patisserie & Cafe — Luxury Desserts" },
      { property: "og:description", content: "Hand-crafted cakes, brownies, macarons and gift boxes." },
    ],
  }),
  component: Home,
});

const slides = [
  {
    image: heroCake,
    eyebrow: "Signature Collection",
    title: "Luxury Desserts,\nMade Fresh.",
    sub: "Hand-crafted every morning with the finest ingredients.",
  },
  {
    image: heroPastries,
    eyebrow: "New This Season",
    title: "A Pastel Affair\nin Every Bite.",
    sub: "Delicate French pastries, macarons and petit fours.",
  },
  {
    image: heroBrownies,
    eyebrow: "Best Sellers",
    title: "Decadent Brownies,\nObsessively Fudgy.",
    sub: "Glossy ganache, sea salt finish, pure indulgence.",
  },
];

function Home() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SLIDER */}
      <section className="relative h-[78vh] min-h-[560px] max-h-[820px] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-cocoa/10 to-transparent" />
          </div>
        ))}

        <div className="relative h-full container mx-auto px-4 sm:px-6 flex items-end pb-20 sm:pb-28">
          <div className="max-w-2xl text-cocoa-foreground">
            <p
              key={`eyebrow-${active}`}
              className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-5 opacity-90 animate-[fade-up_0.6s_ease-out]"
            >
              {slides[active].eyebrow}
            </p>
            <h1
              key={`title-${active}`}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] whitespace-pre-line animate-[fade-up_0.7s_ease-out]"
            >
              {slides[active].title}
            </h1>
            <p
              key={`sub-${active}`}
              className="mt-5 text-base sm:text-lg max-w-md opacity-90 animate-[fade-up_0.8s_ease-out]"
            >
              {slides[active].sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-cream text-cocoa px-7 py-3.5 rounded-full text-sm font-medium hover:bg-blush transition-all hover:scale-[1.02]"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/custom-cake"
                className="inline-flex items-center gap-2 border border-cream/60 text-cream px-7 py-3.5 rounded-full text-sm font-medium hover:bg-cream hover:text-cocoa transition-all"
              >
                Customize Cake
              </Link>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 right-6 sm:right-12 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-cream" : "w-1.5 bg-cream/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* PROMISE STRIP */}
      <section className="border-y border-border bg-cream/40">
        <div className="container mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: Sparkles, t: "Baked Fresh Daily" },
            { icon: Heart, t: "Made with Love" },
            { icon: Sparkles, t: "Premium Ingredients" },
            { icon: Heart, t: "Same-Day Delivery" },
          ].map(({ icon: Icon, t }, i) => (
            <div key={i} className="flex items-center justify-center gap-2.5 text-cocoa">
              <Icon className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-3">Explore</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cocoa max-w-md leading-tight">
              A delicacy for every craving
            </h2>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-sm text-cocoa hover:gap-3 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((c, idx) => (
            <Link
              key={c.slug}
              to="/shop"
              className={`group relative rounded-3xl overflow-hidden bg-muted shadow-soft aspect-[3/4] ${
                idx === 0 ? "lg:row-span-2 lg:aspect-auto" : ""
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl sm:text-2xl text-cream">{c.name}</h3>
                <span className="text-xs text-cream/80 inline-flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                  Discover <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOT PICKS */}
      <section className="bg-blush/30 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-3">Hot Picks 🔥</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cocoa">Loved by everyone</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM CAKE BANNER */}
      <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="relative grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden shadow-elegant min-h-[480px]">
          <div className="relative">
            <img
              src={customBg}
              alt="Custom cakes"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="bg-cream p-10 sm:p-14 lg:p-20 flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-4">Custom orders</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cocoa leading-tight mb-5">
              Design your dream cake 🎂
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Tell us your story and we'll bake it. From birthdays to weddings, every cake is hand-piped, hand-painted and made to delight.
            </p>
            <Link
              to="/custom-cake"
              className="inline-flex w-fit items-center gap-2 bg-cocoa text-cocoa-foreground px-8 py-4 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Start custom order <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream/50 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-3">Sweet words</p>
            <h2 className="font-serif text-4xl sm:text-5xl text-cocoa">From our family of regulars</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ayesha R.",
                text: "The strawberry shortcake is perfection. Light, fresh, and beautiful enough to gift.",
                role: "Dhaka",
              },
              {
                name: "Tanvir H.",
                text: "Ordered a custom cake for my wife's birthday. Stunning detail. She cried (happy tears!).",
                role: "Gulshan",
              },
              {
                name: "Nadia M.",
                text: "Their macarons rival what I had in Paris. Genuinely. The packaging is dreamy too.",
                role: "Banani",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-card rounded-3xl p-8 shadow-soft hover:shadow-blush transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-4 text-rose-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k}>★</span>
                  ))}
                </div>
                <p className="font-serif text-lg text-cocoa leading-relaxed mb-6">"{t.text}"</p>
                <div className="text-sm">
                  <p className="font-medium text-cocoa">{t.name}</p>
                  <p className="text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-3">@izpatisserie</p>
          <h2 className="font-serif text-4xl sm:text-5xl text-cocoa">Follow our daily bake</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3">
          {[heroCake, heroPastries, heroBrownies, customBg, heroCake, heroPastries].map((img, i) => (
            <a
              key={i}
              href="#"
              className="relative aspect-square rounded-2xl overflow-hidden group bg-muted"
            >
              <img
                src={img}
                alt="Instagram"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cocoa/0 group-hover:bg-cocoa/40 transition flex items-center justify-center">
                <span className="text-cream text-xs font-medium opacity-0 group-hover:opacity-100 transition">View</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
