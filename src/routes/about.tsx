import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CakeSlice, Croissant, HeartHandshake, Leaf } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import heroPastries from "@/assets/hero-pastries.jpg";
import izInterior from "@/assets/iz-interior.jpg";
import izCroissant from "@/assets/iz-croissant.jpg";
import izMacarons from "@/assets/iz-macarons.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — IZ Patisserie" },
      {
        name: "description",
        content:
          "The story of IZ Patisserie & Cafe — a boutique patisserie in Dhaka crafting French-inspired cakes, brownies, macarons and coffee with obsessive care.",
      },
      { property: "og:title", content: "About — IZ Patisserie" },
      { property: "og:description", content: "The story behind our boutique patisserie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Croissant,
    title: "Baked fresh, every morning",
    text: "Nothing sits overnight. Croissants come out of the oven before the shutters open, and cakes are assembled the same day they leave us.",
  },
  {
    icon: Leaf,
    title: "Honest ingredients",
    text: "French butter, Belgian chocolate, real vanilla and seasonal fruit. No shortcuts, no artificial flavouring — the label reads like a recipe, not a chemistry list.",
  },
  {
    icon: CakeSlice,
    title: "Made to order",
    text: "Every celebration cake is designed with you — flavours, filling, message and finish — so the cake on your table feels like it was always meant to be there.",
  },
  {
    icon: HeartHandshake,
    title: "Small batch, personal care",
    text: "We keep our batches small on purpose. Fewer cakes a day means every single one gets the attention a hand-made dessert deserves.",
  },
];

const craftSteps = [
  {
    step: "01",
    title: "Sourcing",
    text: "We start with the best butter, couverture chocolate and fresh cream we can find — imported where it matters, local where it's fresher.",
  },
  {
    step: "02",
    title: "Slow craft",
    text: "Croissant dough is laminated over two days. Custards are cooked gently and chilled properly. Time is the ingredient you can't buy.",
  },
  {
    step: "03",
    title: "Finishing by hand",
    text: "Glazes poured, macarons piped and each cake dressed one at a time — no two of our cakes are ever exactly alike, and we like it that way.",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* INTRO */}
      <section className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 sm:pb-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-4">Our Story</p>
        <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl text-cocoa leading-[1.05] max-w-3xl mx-auto mb-6">
          A love letter, baked daily.
        </h1>
        <p className="text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          IZ Patisserie &amp; Cafe is a boutique dessert house in Dhaka — born in a tiny home
          kitchen, built on butter, chocolate and a promise to make every ordinary day taste
          like a small celebration.
        </p>
      </section>

      {/* STORY — image left, text right */}
      <section className="container mx-auto px-4 sm:px-6 pb-14 sm:pb-20 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-elegant">
            <img
              src={heroPastries}
              alt="IZ Patisserie pastries"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-cocoa mb-6">Where it began</h2>
          <div className="space-y-5 text-sm sm:text-base text-foreground/75 leading-relaxed">
            <p>
              It started the way most good things do — with one oven, one very stubborn dream and
              a home kitchen that was far too small. We wanted to bring the soft, romantic
              patisserie experience of Paris and Tokyo to Dhaka: the kind of place where a
              croissant is still laminated by hand and a birthday cake is treated like a gift,
              not an order number.
            </p>
            <p>
              The first months were mostly trial and error — recipes rewritten late at night,
              butter melted, retries and honest feedback from friends and family until each
              recipe earned its place on the menu.
            </p>
            <p>
              Today IZ Patisserie &amp; Cafe is a small, dedicated team of bakers and baristas.
              Every cake, brownie and macaron is still hand-crafted with French butter, Belgian
              chocolate and the kind of obsessive care you can taste in the first bite.
            </p>
            <p>
              We believe dessert is more than an indulgence — it's a quiet ritual, a small
              celebration, a way of saying I love you without words.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-cream/40 border-y border-border/60 py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-3">Our Promise</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-cocoa">What we stand for</h2>
            <p className="mt-3 text-sm text-foreground/65">
              Four simple promises we don't compromise on.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 sm:gap-x-10 gap-y-10">
            {values.map((v) => (
              <div key={v.title} className="border-t border-border/70 pt-6 sm:pt-7">
                <div className="w-10 h-10 rounded-full bg-blush/50 flex items-center justify-center mb-4">
                  <v.icon className="w-[18px] h-[18px] text-rose-gold" />
                </div>
                <h3 className="font-serif text-lg text-cocoa mb-2">{v.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT */}
      <section className="container mx-auto px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl text-cocoa mb-3">How a dessert is made</h2>
          <p className="text-sm text-foreground/65 mb-8">
            From the market to your table — the same careful path, every time.
          </p>
          <div className="space-y-8">
            {craftSteps.map((s) => (
              <div key={s.step} className="flex gap-5">
                <span className="font-serif text-2xl text-rose-gold shrink-0 w-10">{s.step}</span>
                <div>
                  <h3 className="font-serif text-lg text-cocoa mb-1.5">{s.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-soft mt-8">
            <img
              src={izCroissant}
              alt="Fresh croissant"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-soft">
            <img
              src={izMacarons}
              alt="Macarons"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* CAFE EXPERIENCE */}
      <section className="relative">
        <div className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden">
          <img
            src={izInterior}
            alt="IZ Patisserie cafe interior"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-cream mb-3 max-w-xl">
              More than a bakery — a place to slow down
            </h2>
            <p className="text-sm text-cream/85 max-w-xl leading-relaxed">
              Sit down with a warm croissant and a coconut cold brew, stay for the soft light and
              slower hours. Our cafe is the little corner of the city where a pastry is still a
              moment, not a takeaway box.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-cocoa mb-4">
          Come taste what we mean.
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 max-w-xl mx-auto mb-8 leading-relaxed">
          Browse this week's bakes, or tell us what you're celebrating and we'll design a cake
          for it.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 bg-cocoa text-cocoa-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:bg-cocoa/90 transition-all"
          >
            Shop Now <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/custom-cake"
            className="inline-flex items-center gap-1.5 border border-cocoa/30 text-cocoa px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blush/60 transition-all"
          >
            Customize Cake
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
