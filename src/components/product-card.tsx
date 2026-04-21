import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { cartStore } from "@/lib/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cartStore.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      flavor: product.flavors[0],
      qty: 1,
    });
  };

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted shadow-soft">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.tag && (
          <span className="absolute top-4 left-4 bg-cream/95 backdrop-blur text-cocoa text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-full">
            {product.tag}
          </span>
        )}
        <button
          onClick={quickAdd}
          className="absolute bottom-4 left-4 right-4 bg-cocoa text-cocoa-foreground text-sm font-medium py-3 rounded-full opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:opacity-90"
        >
          Quick add
        </button>
      </div>
      <div className="mt-4 px-1 flex justify-between items-start gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{product.category}</p>
          <h3 className="font-serif text-lg text-cocoa mt-1">{product.name}</h3>
        </div>
        <span className="font-medium text-cocoa whitespace-nowrap pt-4">৳{product.price.toLocaleString()}</span>
      </div>
    </Link>
  );
}
