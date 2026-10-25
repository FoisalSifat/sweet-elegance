import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Send,
  Instagram,
  Facebook,
  CheckCircle2,
  CakeSlice,
  Truck,
  MessageCircleHeart,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useCms } from "@/lib/cms-store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — IZ Patisserie" },
      {
        name: "description",
        content:
          "Visit, call or write to IZ Patisserie & Cafe — custom cake orders, wholesale and general inquiries answered the same day.",
      },
      { property: "og:title", content: "Contact — IZ Patisserie" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

const subjectOptions = [
  "General inquiry",
  "Custom cake order",
  "Wholesale / bulk order",
  "Feedback & suggestions",
] as const;

const faqs = [
  {
    q: "How far in advance should I order a custom cake?",
    a: "For fondant and tiered celebration cakes we recommend at least 24 hours notice. Ready-made cakes and pastries can often be picked up same day — just call ahead.",
  },
  {
    q: "Do you deliver across Dhaka?",
    a: "Yes — same day delivery is available for orders placed before 2:00 PM across Banani, Gulshan, Dhanmondi, Uttara, Bashundhara, Mirpur and nearby areas.",
  },
  {
    q: "Can I place a bulk or corporate order?",
    a: "Absolutely. For boxes of 20+ pastries, corporate gifting or event catering, email us at orders@izpatisserie.com and we'll put a tailored quote together.",
  },
  {
    q: "Do your desserts contain nuts or allergens?",
    a: "Many of our desserts contain nuts, dairy, eggs and gluten. Every product page lists the key ingredients — message us if you have a specific allergy concern.",
  },
];

function Contact() {
  const { settings } = useCms();
  const [form, setForm] = useState({ name: "", email: "", subject: subjectOptions[0] as string, message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const valid =
    form.name.trim().length > 1 &&
    /.+@.+\..+/.test(form.email) &&
    form.message.trim().length > 5;

  const info = [
    {
      icon: MapPin,
      t: "Visit the café",
      d: settings.contact.address,
      action: { label: "Get directions", href: "https://www.google.com/maps?q=Banani,+Dhaka" },
    },
    {
      icon: Phone,
      t: "Call us",
      d: `${settings.contact.phone}\n${settings.contact.hours}`,
      action: { label: "Call now", href: `tel:${settings.contact.phone.replace(/\s/g, "")}` },
    },
    {
      icon: Mail,
      t: "Email us",
      d: `${settings.contact.email}\n${settings.contact.secondaryEmail}`,
      action: { label: "Write an email", href: `mailto:${settings.contact.email}` },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero header */}
      <section className="bg-gradient-cream border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-14 xs:py-16 sm:py-20 text-center max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-rose-gold mb-4">Say hello</p>
          <h1 className="font-serif text-4xl xs:text-5xl sm:text-6xl text-cocoa leading-[1.05]">
            We'd love to hear from you
          </h1>
          <p className="mt-5 text-foreground/70 leading-relaxed">
            Custom cakes, bulk orders, press, or just to say hi — we read every message and reply
            within one working day.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="container mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {info.map(({ icon: Icon, t, d, action }, i) => (
            <div
              key={i}
              className="bg-card rounded-3xl border border-border shadow-soft p-6 flex flex-col"
            >
              <div className="w-11 h-11 rounded-full bg-cocoa text-cocoa-foreground flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-cocoa mb-1.5">{t}</h3>
              <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed flex-1">
                {d}
              </p>
              <a
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-4 text-sm text-cocoa font-medium hover:text-rose-gold transition inline-flex items-center gap-1.5"
              >
                {action.label}
                <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Form + hours/map */}
      <section className="container mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-serif text-2xl xs:text-3xl text-cocoa mb-2">Send us a message</h2>
            <p className="text-sm text-foreground/60 mb-6">
              Fields marked with * are required. We usually reply the same day.
            </p>
            {sent ? (
              <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-soft">
                <CheckCircle2 className="w-10 h-10 text-rose-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl text-cocoa mb-2">Message on its way</h3>
                <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                  Thank you, {form.name.split(" ")[0]}! We'll get back to you at {form.email} within
                  one working day.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: subjectOptions[0], message: "" });
                  }}
                  className="text-sm text-cocoa font-medium hover:text-rose-gold transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (valid) setSent(true);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name *"
                    className="w-full bg-card border border-border rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-cocoa transition"
                  />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email *"
                    className="w-full bg-card border border-border rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-cocoa transition"
                  />
                </div>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-card border border-border rounded-2xl px-5 py-3.5 text-sm text-foreground/80 focus:outline-none focus:border-cocoa transition"
                >
                  {subjectOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={6}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your message * — tell us what you need, dates and quantities help us reply faster."
                  className="w-full bg-card border border-border rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-cocoa resize-none transition"
                />
                <button
                  type="submit"
                  disabled={!valid}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cocoa text-cocoa-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <Send className="w-4 h-4" />
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* Hours + good to know */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-cream/60 rounded-3xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-cocoa" />
                <h3 className="font-serif text-xl text-cocoa">Opening hours</h3>
              </div>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground/70">Saturday — Thursday</dt>
                  <dd className="text-cocoa font-medium whitespace-nowrap">9:00 AM — 10:00 PM</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground/70">Friday</dt>
                  <dd className="text-cocoa font-medium whitespace-nowrap">3:00 PM — 10:00 PM</dd>
                </div>
                <div className="pt-2.5 border-t border-border text-xs text-foreground/60 leading-relaxed">
                  {settings.contact.hours} · Custom cake consultations are best booked in the
                  morning.
                </div>
              </dl>
            </div>

            <div className="bg-cream/60 rounded-3xl p-6 border border-border">
              <h3 className="font-serif text-xl text-cocoa mb-4">Good to know</h3>
              <ul className="space-y-3.5 text-sm text-foreground/70">
                <li className="flex gap-3">
                  <CakeSlice className="w-4 h-4 text-rose-gold shrink-0 mt-0.5" />
                  Custom &amp; fondant cakes need 24 hours notice — ready-made items can go home with
                  you the same day.
                </li>
                <li className="flex gap-3">
                  <Truck className="w-4 h-4 text-rose-gold shrink-0 mt-0.5" />
                  Same day delivery for orders before 2:00 PM; otherwise next day in your preferred
                  window.
                </li>
                <li className="flex gap-3">
                  <MessageCircleHeart className="w-4 h-4 text-rose-gold shrink-0 mt-0.5" />
                  Complimentary gift wrap and personalised notes on orders over ৳2000.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-border shadow-soft">
          <iframe
            title="IZ Patisserie & Cafe location"
            src="https://www.google.com/maps?q=Banani,+Dhaka,+Bangladesh&output=embed"
            className="w-full h-64 xs:h-72 sm:h-80 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-3xl xs:text-4xl text-cocoa">Quick answers</h2>
            <p className="mt-3 text-sm text-foreground/60">
              The questions we hear most often — before you pick up the phone.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm sm:text-base font-medium text-cocoa">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cocoa/60 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-sm text-foreground/70 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Follow */}
          <div className="text-center mt-12">
            <p className="text-sm text-foreground/60 mb-4">Or find us on social</p>
            <div className="flex justify-center gap-3">
              {[
                { Icon: Instagram, href: settings.socials.instagram, label: "Instagram" },
                { Icon: Facebook, href: settings.socials.facebook, label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-cocoa/15 flex items-center justify-center text-cocoa hover:bg-cocoa hover:text-cocoa-foreground transition"
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
