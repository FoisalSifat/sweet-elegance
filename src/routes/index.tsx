import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/lib/products";
import { useCms } from "@/lib/cms-store";
import heroCake from "@/assets/iz-hero-cake.jpg";
import izCroissant from "@/assets/iz-croissant.jpg";
import izCremeBrulee from "@/assets/iz-cremebrulee.jpg";
import izLatte from "@/assets/iz-latte.jpg";
import izPecanTart from "@/assets/iz-pecantart.jpg";


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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});


function Home() {
  const { products, slides, settings } = useCms();
  const igUrl = settings.socials.instagram || "https://www.instagram.com/izpatisserieandcafe/";
  const igHandle = (() => {
    try {
      const u = new URL(igUrl);
      const h = u.pathname.replace(/\//g, "");
      return h ? `@${h}` : "@izpatisserieandcafe";
    } catch {
      return "@izpatisserieandcafe";
    }
  })();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);
  useEffect(() => {
    if (active >= slides.length) setActive(0);
  }, [slides.length, active]);

  // Hot picks carousel
  const railRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 720), behavior: "smooth" });
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SLIDER */}
      <section className="relative h-[64svh] xs:h-[62svh] sm:h-[64vh] min-h-[400px] xs:min-h-[430px] sm:min-h-[480px] md:min-h-[520px] max-h-[680px] overflow-hidden mx-2 xs:mx-3 sm:mx-6 mt-2 xs:mt-3 sm:mt-4 rounded-xl xs:rounded-2xl sm:rounded-3xl">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            {s.video ? (
              <video
                src={s.video}
                poster={s.image || undefined}
                autoPlay
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-cocoa/70 via-cocoa/25 sm:via-cocoa/20 to-transparent" />
          </div>
        ))}

        <div className="relative h-full px-4 xs:px-6 sm:px-10 lg:px-14 flex items-end sm:items-center pb-14 xs:pb-16 sm:pb-0">
          <div className="w-full max-w-[42rem] min-w-0 text-cocoa-foreground">
            <p
              key={`eyebrow-${active}`}
              className="text-[10px] tracking-[0.2em] xs:tracking-[0.28em] uppercase mb-2 xs:mb-3 opacity-90 animate-[fade-up_0.6s_ease-out]"
            >
              {slides[active].eyebrow}
            </p>
            <h1
              key={`title-${active}`}
              className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl leading-[1.05] whitespace-pre-line break-words animate-[fade-up_0.7s_ease-out]"
            >
              {slides[active].title}
            </h1>
            <p
              key={`sub-${active}`}
              className="mt-2 xs:mt-3 text-xs sm:text-sm max-w-sm opacity-90 animate-[fade-up_0.8s_ease-out] leading-relaxed"
            >
              {slides[active].sub}
            </p>
            <div className="mt-4 xs:mt-5 flex flex-col xs:flex-row items-start gap-2 xs:gap-2.5">
              <Link
                to="/shop"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 bg-cream text-cocoa px-4 xs:px-5 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-blush transition-all"
              >
                Shop Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/custom-cake"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 border border-cream/70 text-cream px-4 xs:px-5 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-cream hover:text-cocoa transition-all"
              >
                Customize Cake
              </Link>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-4 right-4 xs:bottom-5 xs:right-6 sm:bottom-6 sm:right-10 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-cream" : "w-1.5 bg-cream/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CATEGORIES — editorial row */}
      <section className="container mx-auto px-4 sm:px-6 pt-7 xs:pt-9 sm:pt-12 lg:pt-14 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 xs:gap-3 sm:gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              className="group relative rounded-xl xs:rounded-2xl overflow-hidden bg-muted aspect-[4/5] shadow-soft"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/65 via-cocoa/0 to-transparent" />
              <span className="absolute bottom-2 left-2 xs:bottom-3 xs:left-3 max-w-[calc(100%-1rem)] truncate bg-cream/90 backdrop-blur text-cocoa text-[10px] xs:text-[11px] font-medium tracking-wide px-2.5 xs:px-3 py-1 rounded-full">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HOT PICKS — horizontal carousel */}
      <section className="bg-cream/40 mt-10 xs:mt-12 sm:mt-16 py-10 xs:py-12 sm:py-16 lg:py-20 border-y border-border/60">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end mb-6 xs:mb-8 gap-3 xs:gap-6">
            <div className="min-w-0">
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl text-cocoa leading-tight">
                The Week's Hot Picks
              </h2>
              <p className="text-xs xs:text-sm text-foreground/65 mt-2">
                Hand-selected favourites for the sweet connoisseur.
              </p>
            </div>
            <div className="hidden sm:flex shrink-0 gap-2">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-cocoa/20 bg-cream/60 text-cocoa hover:bg-cocoa hover:text-cocoa-foreground transition flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Next"
                className="w-10 h-10 rounded-full border border-cocoa/20 bg-cream/60 text-cocoa hover:bg-cocoa hover:text-cocoa-foreground transition flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="flex gap-3 xs:gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 sm:mx-0 px-4 sm:px-0 pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((p) => (
              <div
                key={p.slug}
                className="snap-start shrink-0 w-[76%] xs:w-[68%] sm:w-[42%] md:w-[34%] lg:w-[23.5%]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-4 sm:px-6 pt-10 xs:pt-12 sm:pt-16 pb-12 xs:pb-16 sm:pb-24">
        <div className="text-center mb-7 xs:mb-10">
          <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl text-cocoa">A Sweet Impression</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5">
          {[
            {
              name: "Tanvia Rahman",
              role: "Cake & coffee",
              text: "The cake was soft and not overly sweet, which I really liked. A lovely little treat with coffee — I'd happily have it again.",
            },
            {
              name: "Sabrina Afrin",
              role: "Celebration cake",
              text: "The cake looked lovely on the table, and the flavour was just as good. Everyone wanted another slice. A nice choice for a small celebration.",
            },
            {
              name: "Nusrat Jahan",
              role: "Coconut cold brew",
              text: "The coconut cold brew was smooth and never bitter, and the ice hadn't watered it down by the end. Perfect with a croissant on a hot afternoon.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="flex flex-col bg-card rounded-lg p-4 xs:p-5 sm:p-7 border border-border/60 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex gap-1 text-rose-gold text-sm" aria-label="Sample rating: 5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => <span key={k} aria-hidden="true">★</span>)}
                </div>
                <span className="text-xs text-muted-foreground">{t.role}</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-7 flex-1">
                “{t.text}”
              </p>
              <div className="border-t border-border/60 pt-4">
                <p className="font-medium text-cocoa text-sm">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="container mx-auto px-4 sm:px-6 pb-12 xs:pb-16 sm:pb-24">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between mb-5 xs:mb-6">
          <div className="min-w-0">
            <p className="text-[11px] tracking-[0.28em] uppercase text-cocoa/60 mb-1">Follow Us</p>
            <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl text-cocoa break-all">{igHandle}</h2>
          </div>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-end sm:self-auto text-xs sm:text-sm text-cocoa/70 hover:text-cocoa transition tracking-wide shrink-0"
          >
            View Profile →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-4">
          {[izCroissant, izCremeBrulee, izPecanTart, izLatte].map((img, i) => (
            <a
              key={i}
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl xs:rounded-2xl overflow-hidden group bg-muted"
            >
              <img
                src={img}
                alt="IZ Patisserie Instagram"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cocoa/0 group-hover:bg-cocoa/40 transition flex items-center justify-center">
                <span className="text-cream text-xs font-medium opacity-0 group-hover:opacity-100 transition tracking-wide">
                  View on Instagram
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
