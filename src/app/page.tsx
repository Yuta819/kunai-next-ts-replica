"use client";

import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Work = {
  id: string;
  jp: string;
  title: string;
  meta: string;
  images: string[];
};

type Service = {
  numeral: string;
  title: string;
  desc: string;
  visual: string;
};

type Review = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const works: Work[] = [
  {
    id: "hanami",
    jp: "花見",
    title: "HANAMI",
    meta: "Web Design, Visual Identity",
    images: [
      "https://framerusercontent.com/images/WUgOktkLIFCx7I945reXOInY8iQ.png?width=1500&height=1991",
      "https://framerusercontent.com/images/JrXJioXJhR1o3Qm1Dry83rrMno.png?width=640&height=971",
      "https://framerusercontent.com/images/kdDGV9i1ijFutem1DKD3Cy0SM.png?width=640&height=960",
      "https://framerusercontent.com/images/SQ5BudNYn5FglaWDwM181AeVQl8.png?width=640&height=857",
    ],
  },
  {
    id: "ronin",
    jp: "浪人",
    title: "RONIN",
    meta: "Portfolio Design, Branding",
    images: [
      "https://framerusercontent.com/images/C1eejCrklNhaxj1CHT89UtMJBw.png?width=904&height=1200",
      "https://framerusercontent.com/images/N9pHJ01rqLHlReCWVJBFXFSp0A.png?width=904&height=1200",
      "https://framerusercontent.com/images/WOjFYeByimC9MRdoXEyynpL3WDk.png?width=904&height=1200",
      "https://framerusercontent.com/images/UiTa3C5NsdrCLZBx3W2CI7qDk.png?width=904&height=1200",
    ],
  },
  {
    id: "yami",
    jp: "闇",
    title: "YAMI",
    meta: "Web Design, Sound Branding",
    images: [
      "https://framerusercontent.com/images/IaO13eteDl9kVaNrtMcstEurEw.png?width=640&height=320",
      "https://framerusercontent.com/images/kuHNBwLrh7crb9VYL46Ndp1TtBI.png?width=1500&height=1000",
      "https://framerusercontent.com/images/kZsQ7RU5BGWjnCYdo95ejL63yw.png?width=640&height=800",
      "https://framerusercontent.com/images/BO08vtcIBj2aB5xjY3O2ChxvE4.png?width=640&height=800",
    ],
  },
  {
    id: "enso",
    jp: "円相",
    title: "ENSO",
    meta: "Website Redesign, Identity System",
    images: [
      "https://framerusercontent.com/images/XiTByEqEBV8HUoc6seqzhdw9qDs.png?width=1500&height=1991",
      "https://framerusercontent.com/images/v8WYjO3LPKVrNx9Y01rGV0ZA.png?width=960&height=1200",
      "https://framerusercontent.com/images/gzNE5DPrN9qV0Rv7w01MqxNmw0.png?width=904&height=1200",
      "https://framerusercontent.com/images/BUndDhjNivAV4FZxADynFwdz1Q.png?width=1200&height=1097",
    ],
  },
];

const processSteps = [
  {
    jp: "見極め",
    en: "Discovery",
    body: "Every blade begins with understanding its purpose. We start by learning your brand, audience, and message.",
  },
  {
    jp: "構想",
    en: "Strategy",
    body: "We define the framework and rhythm of your product, where clarity and expression become one direction.",
  },
  {
    jp: "設計",
    en: "Design",
    body: "Structure, typography, and motion are forged together so each interaction feels inevitable and precise.",
  },
  {
    jp: "研磨",
    en: "Refinement",
    body: "We test and polish details relentlessly, balancing visual character with frictionless usability.",
  },
  {
    jp: "解放",
    en: "Launch",
    body: "The crafted experience is released with confidence, built to endure and leave a lasting impact.",
  },
];

const services: Service[] = [
  {
    numeral: "一",
    title: "Interface Design",
    desc: "We craft visually clean, highly functional interfaces that reinforce brand presence while making every flow intuitive.",
    visual:
      "https://framerusercontent.com/images/F7DB5zonuQnysXmiI86rwc77Sgs.png?width=1024&height=1024",
  },
  {
    numeral: "二",
    title: "Web Development",
    desc: "Reliable implementation with strong performance, polished interaction details, and practical maintainability.",
    visual:
      "https://framerusercontent.com/images/p1A1QC3s0RV1xP2RgqjkoU7U8k.png?width=992&height=1200",
  },
  {
    numeral: "三",
    title: "Framer Prototyping",
    desc: "Fast high-fidelity prototypes to validate hierarchy, transitions, and narrative before full development.",
    visual:
      "https://framerusercontent.com/images/aLkJACrBu25Jyoi6xzNNeYSWxk.png?width=1456&height=816",
  },
  {
    numeral: "四",
    title: "Design Systems",
    desc: "Reusable components and tokens that preserve quality and speed as your product and team scale.",
    visual:
      "https://framerusercontent.com/images/3OtyqO3zfExMYXLCHhdkV8api0.png?width=1376&height=864",
  },
  {
    numeral: "五",
    title: "Brand Touch UI",
    desc: "A distinct visual voice expressed through type, spacing, and micro-interactions across every touchpoint.",
    visual:
      "https://framerusercontent.com/images/e6ojUMZrT1ymAF2uL7CUuTlsHT4.png?width=1024&height=1056",
  },
  {
    numeral: "六",
    title: "Interaction & Motion",
    desc: "Meaningful motion systems that reinforce hierarchy, improve comprehension, and enrich the overall experience.",
    visual:
      "https://framerusercontent.com/images/fwQ40gdHq90aWhGGqHGylN32M.png?width=1312&height=928",
  },
];

const reviews: Review[] = [
  {
    quote:
      "The build is sharp, seamless, and full of presence. Visitors stay longer and engage deeper.",
    name: "Darius Fen",
    role: "Web Consultant",
    avatar:
      "https://framerusercontent.com/images/fnVYekemCvPdqGDHzzfxuzvhY.jpg?width=3648&height=5357",
  },
  {
    quote:
      "The identity we now carry feels carved, not styled. Bold, deliberate, and impossible to ignore.",
    name: "Arden Mira",
    role: "Creative Director",
    avatar:
      "https://framerusercontent.com/images/VGBC6JgnJ1NDcSnPWuaudHHc8AA.jpg?width=3072&height=4608",
  },
  {
    quote:
      "This was not just design. The site draws people in like a portal and feels truly aligned with who we are.",
    name: "Eira Thorne",
    role: "Founder",
    avatar:
      "https://framerusercontent.com/images/6kJK5d5TaB3shOmxGuGBrC14pS8.jpg?width=4000&height=5333",
  },
  {
    quote:
      "This work has weight. It does not just look good, it resonates and feels inevitable.",
    name: "Jonas Keller",
    role: "Brand Strategist",
    avatar:
      "https://framerusercontent.com/images/VywUiS5UnNdSGPgORZdwra7SqU.jpg?width=2132&height=3196",
  },
  {
    quote:
      "The result does not sit on a screen. It has depth, dimension, and soul like a crafted relic.",
    name: "Sofia Arendt",
    role: "Entrepreneur",
    avatar:
      "https://framerusercontent.com/images/f5WncmAkoKrrS0TUHhfFSwEA37Q.jpg?width=5802&height=3264",
  },
  {
    quote:
      "This is more than online presence. It is identity forged in light and precision.",
    name: "Leon Richter",
    role: "CEO",
    avatar:
      "https://framerusercontent.com/images/vKEPB1KhQzJYzo697mfwgiSdk.jpg?width=2944&height=2600",
  },
];

const faqItems = [
  {
    q: "What types of properties do you offer?",
    a: "We specialize in luxury rentals, residential properties, and investment-grade real estate in top-tier European cities.",
  },
  {
    q: "How do I start the property buying process?",
    a: "Begin by scheduling a consultation. We assess your goals and map available properties that fit your timeline and budget.",
  },
  {
    q: "Do you offer relocation services?",
    a: "Yes. We support relocation end-to-end including temporary accommodation, coordination, and local setup guidance.",
  },
  {
    q: "What are all the areas you cover?",
    a: "We focus on prime locations in Spain, Portugal, Switzerland, and Germany with high-demand neighborhoods.",
  },
  {
    q: "Do you manage properties on behalf of owners?",
    a: "Yes. We handle tenant communication, maintenance coordination, and recurring reporting for passive ownership.",
  },
  {
    q: "How do I schedule a viewing?",
    a: "Contact us through the website and we will arrange in-person or virtual viewing slots based on your availability.",
  },
  {
    q: "Are the properties listed for sale or for rent?",
    a: "Both. We offer a balanced mix of rental and purchase opportunities across different investment profiles.",
  },
  {
    q: "How can I sell my property with you?",
    a: "Our team runs valuation, market positioning, listing strategy, and negotiation support through closing.",
  },
  {
    q: "What is the best way to contact you?",
    a: "Use our contact form, email, or phone. We are available for quick questions and detailed consultations.",
  },
  {
    q: "Can I request a virtual tour?",
    a: "Absolutely. High-quality virtual walkthroughs are available for select listings.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const swordY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const swordRotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

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
    <div className="kunai-root">
      <main>
        <section ref={heroRef} className="hero">
          <motion.img
            className="hero-branch hero-branch-left"
            src="https://framerusercontent.com/images/uMyzB2vazLLSrLxJ9rSIKlIoOE.png?width=1350&height=1824"
            alt=""
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, ease: [0.12, 0.23, 0.5, 1] }}
          />
          <motion.img
            className="hero-branch hero-branch-right"
            src="https://framerusercontent.com/images/dPyScyfbJz1qfrXAN9tzKL0Zw.jpg?width=1350&height=1824"
            alt=""
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.12, 0.23, 0.5, 1] }}
          />
          <motion.img
            className="hero-sword"
            src="https://framerusercontent.com/images/XGAKtx7wLruLCS7j8Gx4CqvuVeI.png?width=230&height=1158"
            alt=""
            style={{ y: swordY, rotate: swordRotate }}
            initial={{ opacity: 0, y: -120, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [1, 0.04, 0.27, 0.98] }}
          />

          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 70, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.5, 0, 0.88, 0.77] }}
          >
            <h1>KUNAI</h1>
            <p>Precision.</p>
            <p>Focus.</p>
            <p>Design.</p>
          </motion.div>
          <a className="scroll-dot" href="#works" aria-label="Scroll to works" />
        </section>

        <section className="manifesto">
          <motion.p
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.12, 0.23, 0.5, 1] }}
          >
            Design with shokunin spirit, mastery in every detail, precision in every
            motion. We refine, we respect, we endure.
          </motion.p>
        </section>

        <section className="section works" id="works">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">私たちの作品</p>
            <div>
              <h2>FORGED</h2>
              <h2>WORKS</h2>
            </div>
            <a className="section-link" href="#">
              View All Works
            </a>
          </motion.div>

          <div className="work-list">
            {works.map((work, index) => {
              const hovered = hoveredWork === work.id;
              return (
                <motion.article
                  key={work.id}
                  className="work-card"
                  initial={{ opacity: 0, y: 90 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredWork(work.id)}
                  onMouseLeave={() => setHoveredWork(null)}
                >
                  <div className="work-card-copy">
                    <div className="work-meta">
                      <span>{work.jp}</span>
                      <span>{work.meta}</span>
                    </div>
                    <h3>{work.title}</h3>
                    <motion.div
                      className="view-project"
                      animate={
                        hovered
                          ? { opacity: 1, scale: 1, x: 0 }
                          : { opacity: 0, scale: 0.85, x: -12 }
                      }
                      transition={{ duration: 0.4, ease: [0.12, 0.23, 0.5, 1] }}
                    >
                      View
                      <br />
                      Project
                    </motion.div>
                  </div>
                  <div className="work-card-media">
                    <motion.div
                      className="work-card-grid"
                      animate={
                        hovered
                          ? { x: -12, y: -12, scale: 1.02, opacity: 1 }
                          : { x: 0, y: 0, scale: 1, opacity: 0.86 }
                      }
                      transition={{ duration: 0.8, ease: [0.5, 0, 0.88, 0.77] }}
                    >
                      {work.images.map((img) => (
                        <img key={img} src={img} alt="" />
                      ))}
                    </motion.div>
                    <motion.img
                      className="work-main-image"
                      src={work.images[0]}
                      alt="orange flower"
                      animate={hovered ? { scale: 1.06 } : { scale: 1 }}
                      transition={{ duration: 1.2, ease: [0.12, 0.23, 0.5, 1] }}
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="section process" id="process-container">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
          >
            THE PROCESS
          </motion.h2>
          <div className="process-list">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.en}
                className="process-item"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: index * 0.06 }}
              >
                <p>{step.jp}</p>
                <h3>{step.en}</h3>
                <p>{step.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section services" id="service-section">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">当社のサービス</p>
            <div>
              <h2>SILENT</h2>
              <h2>SKILL</h2>
            </div>
          </motion.div>
          <div className="service-grid">
            <div className="service-list">
              {services.map((service, index) => {
                const active = index === activeService;
                return (
                  <motion.button
                    key={service.title}
                    className={`service-item ${active ? "is-active" : ""}`}
                    onClick={() => setActiveService(index)}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{service.numeral}</p>
                    <div>
                      <p>{service.title}</p>
                      <p>{service.desc}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <div className="service-visual">
              <AnimatePresence mode="wait">
                <motion.img
                  key={services[activeService].visual}
                  src={services[activeService].visual}
                  alt=""
                  initial={{ opacity: 0, scale: 1.08, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -20 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
              <div className="service-caption">
                <p>{services[activeService].title}</p>
                <p>{services[activeService].desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section reviews">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
          >
            REVIEWS
          </motion.h2>
          <div className="review-grid">
            {reviews.map((review, index) => (
              <motion.article
                key={review.name}
                className="review-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              >
                <p>{review.quote}</p>
                <div className="review-meta">
                  <img src={review.avatar} alt={review.name} />
                  <div>
                    <p>{review.name}</p>
                    <p>{review.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
            <article className="review-card review-score">
              <div>
                <p>4.8</p>
                <p>/5</p>
              </div>
              <p>
                Over 122 projects crafted to drive measurable impact and real growth
                for businesses.
              </p>
              <div className="trusted">
                {reviews.slice(0, 5).map((review) => (
                  <img key={review.name} src={review.avatar} alt={review.name} />
                ))}
                <strong>82+</strong>
              </div>
              <p>Trusted Worldwide</p>
            </article>
          </div>
        </section>

        <section className="section faq">
          <div className="section-head">
            <p className="section-kicker">よくある明快さ</p>
            <div>
              <h2>COMMON</h2>
              <h2>CLARITY</h2>
            </div>
          </div>
          <div className="faq-grid">
            {faqItems.map((item, index) => {
              const open = index === openFaq;
              return (
                <div
                  key={item.q}
                  className={`faq-item ${open ? "is-open" : ""}`}
                  onClick={() => setOpenFaq(open ? -1 : index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setOpenFaq(open ? -1 : index);
                    }
                  }}
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
                        transition={{ duration: 0.45, ease: [0.12, 0.23, 0.5, 1] }}
                      >
                        {item.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <p>KUNAI</p>
          <p>ク ナ イ</p>
        </div>
        <div className="footer-links">
          <a href="https://www.instagram.com/hamzah.live/">Instagram</a>
          <a href="https://www.linkedin.com/in/hamzah-haroon-097382290/">LinkedIn</a>
          <a href="https://x.com/HamzahHaroon2">X (Twitter)</a>
          <a href="https://framer.link/hamzah">Framer</a>
        </div>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#works">Works</a>
          <a href="#process-container">Process</a>
          <a href="#service-section">Services</a>
        </div>
        <div className="footer-bottom">
          <p>
            Template built by <strong>Hamzah</strong> in <strong>Framer</strong>
          </p>
          <p>© 2026 Kunai. All rights reserved.</p>
        </div>
      </footer>

      <div className="floating-actions">
        <a href="https://kunaidark.framer.website/" target="_blank" rel="noreferrer">
          ☾&nbsp; Dark Mode
        </a>
        <a href="https://framer.link/bD3hVpq" target="_blank" rel="noreferrer">
          🔥&nbsp; Use for Free
        </a>
        <a href="https://www.framer.com" target="_blank" rel="noreferrer">
          ◣&nbsp; Made in Framer
        </a>
      </div>
      <div className="floating-center-dot" />
    </div>
  );
}
