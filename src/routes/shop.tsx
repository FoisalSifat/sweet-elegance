import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { useCms } from "@/lib/cms-store";
import { useState } from "react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Cafe Menu — IZ Patisserie" },
      { name: "description", content: "Browse IZ Patisserie & Cafe coffee, croissants, cakes, desserts and hearty meals." },
      { property: "og:title", content: "Shop — IZ Patisserie" },
      { property: "og:description", content: "Quality coffee, croissants, cakes, desserts and comfort meals." },
    ],
  }),
  component: Shop,
});

const filters = ["All", "Coffee", "Croissants", "Cakes", "Desserts", "Meals"];

function Shop() {
  const { products } = useCms();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="container mx-auto px-4 sm:px-6 pt-8 xs:pt-12 pb-6 sm:pt-20 sm:pb-8">
        <p className="text-[10px] xs:text-xs tracking-[0.3em] uppercase text-rose-gold mb-3 xs:mb-4">The Collection</p>
        <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-cocoa max-w-2xl leading-[1.05]">
          Coffee, desserts and café favourites.
        </h1>
        <p className="mt-4 xs:mt-5 text-sm xs:text-base text-foreground/70 max-w-xl">
          Browse signature coffee, croissants, chilled desserts and comforting meals from IZ Patisserie & Cafe.
        </p>
      </section>

      <section className="container mx-auto px-4 sm:px-6 sticky top-[80px] xs:top-[96px] sm:top-[124px] lg:top-[148px] z-30 bg-background/90 backdrop-blur py-3 sm:py-4 border-b border-border -mx-0">
        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 xs:px-5 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm whitespace-nowrap transition-all shrink-0 ${
                filter === f
                  ? "bg-cocoa text-cocoa-foreground"
                  : "border border-border text-foreground/80 hover:border-cocoa hover:text-cocoa"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-8 xs:py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-5 sm:gap-8">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No items in this category yet.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
