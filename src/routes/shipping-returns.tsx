import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Truck, RefreshCcw, Cake, Clock, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — IZ Patisserie" },
      { name: "description", content: "Delivery areas, timing, packaging and returns policy for IZ Patisserie & Cafe — fresh cakes and desserts across Dhaka." },
      { property: "og:title", content: "Shipping & Returns — IZ Patisserie" },
      { property: "og:description", content: "Delivery areas, timing, packaging and returns policy for IZ Patisserie & Cafe." },
      { property: "og:url", content: "/shipping-returns" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/shipping-returns" }],
  }),
  component: ShippingReturns,
});

const sections = [
  {
    icon: Truck,
    title: "Delivery Areas",
    body: "We hand-deliver across Dhaka city — Gulshan, Banani, Dhanmondi, Uttara, Bashundhara, Mirpur, Motijheel and nearby areas. Outside Dhaka? Message us before ordering and we'll confirm if a same-day or next-day courier drop is possible for your address.",
  },
  {
    icon: Clock,
    title: "Delivery Timing",
    body: "Same-day delivery is available on orders placed before 2:00 PM. Orders placed after 2:00 PM are delivered the next day. You can also pick a preferred delivery window (morning, afternoon or evening) at checkout — we'll confirm it with you on call or WhatsApp.",
  },
  {
    icon: Cake,
    title: "Packaging & Freshness",
    body: "Every cake and dessert travels in temperature-conscious, sealed packaging so it arrives exactly as it left our kitchen. Cream-based cakes are best enjoyed within 24 hours and kept refrigerated; brownies, tarts and cookies stay fresh for 2–3 days in a cool, dry place.",
  },
  {
    icon: RefreshCcw,
    title: "Returns & Refunds",
    body: "Because our products are fresh food, we can't accept returns once a delivery is accepted in good condition. If your order arrives damaged, incorrect or noticeably below our standard, contact us within 2 hours of delivery with a photo — we'll replace it or issue a full refund, whichever you prefer.",
  },
  {
    icon: MapPin,
    title: "Order Changes & Cancellations",
    body: "Custom and fondant cakes are made to order, so changes or cancellations need at least 24 hours' notice. Ready-made items can be changed or cancelled up to 4 hours before the delivery window. Once baking has started, we can't cancel, but we'll always try to find a fair solution.",
  },
  {
    icon: MessageCircle,
    title: "Questions?",
    body: "The fastest way to reach us is WhatsApp or a call — we answer every day during cafe hours. You can also send a message through our contact page and we'll reply within one working day.",
  },
];

function ShippingReturns() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-4">Good to know</p>
        <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl text-cocoa leading-[1.05] mb-6">
          Shipping & Returns
        </h1>
        <p className="text-foreground/70 leading-relaxed">
          Fresh desserts deserve careful handling. Here's exactly how we deliver, what to expect
          when your order arrives, and what happens if something isn't right.
        </p>
      </section>

      <section className="container mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
          {sections.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 transition-shadow hover:shadow-elegant"
            >
              <div className="w-10 h-10 rounded-full bg-cocoa/10 text-cocoa flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-cocoa mb-3">{title}</h2>
              <p className="text-sm text-foreground/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-cocoa text-cocoa-foreground rounded-full px-7 py-3 text-sm tracking-wide hover:opacity-90 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
