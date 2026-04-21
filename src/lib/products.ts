import strawberry from "@/assets/product-strawberry.jpg";
import chocolate from "@/assets/product-chocolate.jpg";
import macarons from "@/assets/product-macarons.jpg";
import brownie from "@/assets/product-brownie.jpg";
import cheesecake from "@/assets/product-cheesecake.jpg";
import giftbox from "@/assets/product-giftbox.jpg";
import custom from "@/assets/product-custom.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: "Best Seller" | "Limited" | "New";
  description: string;
  ingredients: string;
  sizes: string[];
  flavors: string[];
};

export const products: Product[] = [
  {
    slug: "strawberry-shortcake",
    name: "Strawberry Shortcake",
    price: 1850,
    image: strawberry,
    category: "Cakes",
    tag: "Best Seller",
    description: "Pillowy vanilla sponge layered with fresh whipped cream and ripe seasonal strawberries. A delicate classic that melts on the tongue.",
    ingredients: "Flour, butter, eggs, sugar, fresh cream, strawberries, vanilla bean.",
    sizes: ["6 inch", "8 inch", "10 inch"],
    flavors: ["Classic Vanilla", "Almond"],
  },
  {
    slug: "chocolate-truffle",
    name: "Chocolate Truffle",
    price: 2100,
    image: chocolate,
    category: "Cakes",
    tag: "Best Seller",
    description: "Rich Belgian chocolate layers wrapped in glossy ganache. Decadent, deeply chocolatey, unforgettable.",
    ingredients: "Belgian dark chocolate, butter, eggs, sugar, cream, cocoa.",
    sizes: ["6 inch", "8 inch", "10 inch"],
    flavors: ["Dark", "Milk", "Hazelnut"],
  },
  {
    slug: "rose-macarons",
    name: "Rose Macaron Box",
    price: 980,
    image: macarons,
    category: "Pastries",
    tag: "New",
    description: "A box of twelve hand-piped French macarons in rose, vanilla, and pistachio. Crisp shells, silky ganache.",
    ingredients: "Almond flour, egg whites, sugar, butter, natural flavors.",
    sizes: ["6 pcs", "12 pcs", "24 pcs"],
    flavors: ["Assorted", "Rose only", "Vanilla only"],
  },
  {
    slug: "salted-fudge-brownie",
    name: "Salted Fudge Brownie",
    price: 720,
    image: brownie,
    category: "Brownies",
    tag: "Best Seller",
    description: "Dense, fudgy brownies finished with flaky sea salt. Box of nine squares of pure indulgence.",
    ingredients: "Dark chocolate, butter, eggs, flour, sugar, sea salt.",
    sizes: ["6 pcs", "9 pcs", "12 pcs"],
    flavors: ["Classic", "Walnut", "Espresso"],
  },
  {
    slug: "berry-cheesecake",
    name: "Berry Cheesecake",
    price: 1650,
    image: cheesecake,
    category: "Cakes",
    description: "Velvety baked cheesecake topped with house-made mixed berry compote on a buttery biscuit base.",
    ingredients: "Cream cheese, eggs, sugar, biscuit, butter, mixed berries.",
    sizes: ["6 inch", "8 inch"],
    flavors: ["Mixed Berry", "Strawberry", "Blueberry"],
  },
  {
    slug: "luxe-gift-box",
    name: "Luxe Gift Box",
    price: 2450,
    image: giftbox,
    category: "Gift Boxes",
    tag: "Limited",
    description: "An elegant blush box of curated petit fours, truffles, and macarons. Hand-tied satin ribbon and a personalised note.",
    ingredients: "Assorted pastries; see individual items for details.",
    sizes: ["Petite", "Signature", "Grand"],
    flavors: ["Curated", "Chocolate Lover", "Floral"],
  },
];

export const categories = [
  { name: "Cakes", image: strawberry, slug: "cakes" },
  { name: "Brownies", image: brownie, slug: "brownies" },
  { name: "Pastries", image: macarons, slug: "pastries" },
  { name: "Custom Cakes", image: custom, slug: "custom" },
  { name: "Gift Boxes", image: giftbox, slug: "gift-boxes" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
