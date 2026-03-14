"use client";

import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  shape: string;
  flavor: string;
  price: string;
  desc: string;
  image: string;
};

type Stop = {
  area: string;
  time: string;
  note: string;
  map: string;
};

type Voice = {
  quote: string;
  name: string;
  country: string;
};

const menuItems: MenuItem[] = [
  {
    id: "classic",
    name: "Ninja Star Classic",
    shape: "4-point Shuriken Cut",
    flavor: "Sea Salt + Potato Gold Dust",
    price: "¥700",
    desc: "The original crispy shuriken fries. Light, crunchy, and easy to share while walking.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ketchup",
    name: "Ketchup Red Strike",
    shape: "6-point Shuriken Cut",
    flavor: "Tomato Ketchup + Chili Spark",
    price: "¥780",
    desc: "Sweet and bold with a little kick. Designed for the first bite that makes people stop and smile.",
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "wasabi",
    name: "Wasabi Mint Dash",
    shape: "8-point Shuriken Cut",
    flavor: "Wasabi Mint + Lime",
    price: "¥820",
    desc: "Fresh, cool, and surprising. A local favorite for adventurous travelers.",
    image:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "triple",
    name: "Triple Shadow Box",
    shape: "Mixed Shuriken Set",
    flavor: "Classic + Ketchup Red + Wasabi Mint",
    price: "¥1400",
    desc: "Try all signature flavors in one box. Built for groups, families, and photo moments.",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80",
  },
];

const stopsToday: Stop[] = [
  {
    area: "Asakusa - Sensoji Gate",
    time: "11:30 - 14:00",
    note: "Best timing before lunch crowds peak.",
    map: "https://maps.google.com/?q=Asakusa+Sensoji",
  },
  {
    area: "Shibuya - Scramble Crossing",
    time: "15:30 - 18:30",
    note: "Main photo spot. Expect short queue at sunset.",
    map: "https://maps.google.com/?q=Shibuya+Scramble+Crossing",
  },
  {
    area: "Tokyo Skytree - Solamachi Side",
    time: "19:30 - 22:00",
    note: "Night view + snack mission complete.",
    map: "https://maps.google.com/?q=Tokyo+Skytree",
  },
];

const voices: Voice[] = [
  {
    quote:
      "I came for the shape, stayed for the crunch. It is the most fun street snack I had in Tokyo.",
    name: "Maya L.",
    country: "Singapore",
  },
  {
    quote:
      "My kids called it treasure fries. We followed the truck to two spots in one day.",
    name: "Daniel R.",
    country: "Australia",
  },
  {
    quote:
      "Fast service, great photos, and unique flavor combos. Perfect between sightseeing stops.",
    name: "Sofia K.",
    country: "Spain",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80",
];

const faqItems = [
  {
    q: "Do you have vegetarian options?",
    a: "Yes. Our fries are plant-based and cooked in dedicated vegetable oil.",
  },
  {
    q: "Is the seasoning spicy?",
    a: "Classic is mild. Ketchup Red is medium. Wasabi Mint has a sharp but short kick.",
  },
  {
    q: "Can I pay by card or mobile wallet?",
    a: "Yes. We accept major cards, IC cards, Apple Pay, and Google Pay.",
  },
  {
    q: "Do you have halal-friendly options?",
    a: "Our fries do not contain pork or alcohol ingredients. Please ask staff for the latest allergen sheet.",
  },
  {
    q: "Can I book the truck for events?",
    a: "Yes. We serve pop-ups, festivals, school events, and brand campaigns.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const shurikenY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const shurikenRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="ninja-root">
      <main>
        <section ref={heroRef} className="hero">
          <motion.div
            className="hero-glow hero-glow-a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.div
            className="hero-glow hero-glow-b"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />

          <motion.div
            className="shuriken shuriken-left"
            style={{ y: shurikenY, rotate: shurikenRotate }}
            initial={{ opacity: 0, x: -60, rotate: -30 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.12, 0.23, 0.5, 1] }}
          />
          <motion.div
            className="shuriken shuriken-right"
            style={{ y: shurikenY, rotate: shurikenRotate }}
            initial={{ opacity: 0, x: 60, rotate: 30 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.12, 0.23, 0.5, 1] }}
          />

          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.2 }}
          >
            <p className="hero-badge">Tokyo Street Launch</p>
            <h1>NINJA POTATO</h1>
            <p className="hero-lead">Shuriken fries you want to hunt down.</p>
            <p className="hero-sub">
              Built for travelers who collect memories, not just meals.
            </p>
            <div className="hero-cta">
              <a href="#find-us">Find Truck Now</a>
              <a href="#menu">See Menu</a>
            </div>
          </motion.div>

          <a className="scroll-dot" href="#about" aria-label="Scroll to next section" />
        </section>

        <section className="section about" id="about">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">What is NINJA POTATO?</p>
            <div>
              <h2>FINDABLE</h2>
              <h2>EXPERIENCE</h2>
            </div>
          </motion.div>
          <motion.p
            className="about-copy"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            NINJA POTATO is a mobile food brand designed around one idea: selling
            the thrill of discovery. We appear in high-traffic sightseeing areas,
            serve shuriken-shaped fries, and turn snack time into a mini mission for
            visitors.
          </motion.p>
          <div className="about-pillars">
            {[
              ["Hunt", "Track our live location and catch the truck."],
              ["Snap", "Capture iconic photos with ninja-inspired fries."],
              ["Crunch", "Enjoy bold flavors while exploring Japan."],
            ].map(([title, desc], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section menu" id="menu">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">Menu</p>
            <div>
              <h2>GOLDEN</h2>
              <h2>LOADOUT</h2>
            </div>
          </motion.div>
          <div className="menu-list">
            {menuItems.map((item, index) => {
              const isHovered = hoveredMenu === item.id;
              return (
                <motion.article
                  key={item.id}
                  className="menu-card"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredMenu(item.id)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <div className="menu-copy">
                    <div className="menu-meta">
                      <span>{item.shape}</span>
                      <span>{item.flavor}</span>
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <strong>{item.price}</strong>
                    <motion.div
                      className="menu-fx"
                      animate={
                        isHovered
                          ? { opacity: 1, scale: 1, x: 0 }
                          : { opacity: 0, scale: 0.85, x: -12 }
                      }
                      transition={{ duration: 0.35 }}
                    >
                      Taste
                      <br />
                      Quest
                    </motion.div>
                  </div>
                  <div className="menu-media">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      animate={isHovered ? { scale: 1.07 } : { scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="section find-us" id="find-us">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">Find us today</p>
            <div>
              <h2>LIVE</h2>
              <h2>ROUTE</h2>
            </div>
          </motion.div>
          <div className="find-grid">
            <div className="find-list">
              {stopsToday.map((stop, index) => (
                <motion.article
                  key={stop.area}
                  className="stop-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                >
                  <p>{stop.time}</p>
                  <h3>{stop.area}</h3>
                  <p>{stop.note}</p>
                  <a href={stop.map} target="_blank" rel="noreferrer">
                    Open in Maps
                  </a>
                </motion.article>
              ))}
            </div>
            <motion.div
              className="map-card"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
            >
              <p>Today&apos;s mission area</p>
              <h3>Asakusa → Shibuya → Skytree</h3>
              <p>
                Save this page and check before heading out. Route updates may happen
                due to weather and event traffic.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section love">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">Why people love it</p>
            <div>
              <h2>CRUNCH</h2>
              <h2>PROOF</h2>
            </div>
          </motion.div>
          <div className="love-grid">
            {voices.map((voice, index) => (
              <motion.article
                key={voice.name}
                className="love-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
              >
                <p>{voice.quote}</p>
                <div>
                  <p>{voice.name}</p>
                  <p>{voice.country}</p>
                </div>
              </motion.article>
            ))}
            <article className="love-card love-score">
              <p>4.9 / 5 street snack rating</p>
              <h3>12k+</h3>
              <p>Shuriken boxes served to travelers in launch month.</p>
            </article>
          </div>
        </section>

        <section className="section gallery">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">Gallery / Instagram</p>
            <div>
              <h2>SPOT IT</h2>
              <h2>SHARE IT</h2>
            </div>
            <a className="section-link" href="https://instagram.com" target="_blank" rel="noreferrer">
              Follow @ninjapotato.jp
            </a>
          </motion.div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt="NINJA POTATO gallery"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
              />
            ))}
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="section-head">
            <p className="section-kicker">FAQ</p>
            <div>
              <h2>QUICK</h2>
              <h2>ANSWERS</h2>
            </div>
          </div>
          <div className="faq-grid">
            {faqItems.map((item, index) => {
              const open = openFaq === index;
              return (
                <button
                  key={item.q}
                  className={`faq-item ${open ? "is-open" : ""}`}
                  onClick={() => setOpenFaq(open ? -1 : index)}
                >
                  <div className="faq-row">
                    <p>{item.q}</p>
                    <span>{open ? "−" : "+"}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </section>

        <section className="section final-cta" id="booking">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p>Event booking / Final CTA</p>
            <h2>Bring NINJA POTATO to your event</h2>
            <p>
              Planning a festival, hotel activation, or school event in Japan? We
              provide fast service, bilingual support, and photo-ready food moments.
            </p>
            <div>
              <a href="mailto:booking@ninjapotato.jp">booking@ninjapotato.jp</a>
              <a href="https://wa.me/810000000000" target="_blank" rel="noreferrer">
                WhatsApp Booking
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <p>NINJA POTATO</p>
          <p>Find it. Snap it. Crunch it.</p>
        </div>
        <div className="footer-links">
          <a href="#menu">Menu</a>
          <a href="#find-us">Find us today</a>
          <a href="#faq">FAQ</a>
          <a href="#booking">Event booking</a>
        </div>
        <div className="footer-bottom">
          <p>Built for visitors exploring Japan&apos;s busiest sightseeing zones.</p>
          <p>© 2026 NINJA POTATO</p>
        </div>
      </footer>

      <div className="floating-actions">
        <a href="#find-us">📍 Find us now</a>
        <a href="#booking">🚚 Book the truck</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          ◎ Instagram
        </a>
      </div>
      <div className="floating-center-dot" />
    </div>
  );
}
