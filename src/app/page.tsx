"use client";

import Lenis from "lenis";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiArrowDown } from "react-icons/fi";

type Locale = "ja" | "en";
type Bilingual = Record<Locale, string>;

type MenuItem = {
  id: string;
  name: Bilingual;
  shape: Bilingual;
  flavor: Bilingual;
  price: string;
  desc: Bilingual;
  image: string;
};

type Stop = {
  numeral: string;
  city: Bilingual;
  area: Bilingual;
  time: string;
  note: Bilingual;
  map: string;
  image: string;
};

type FaqItem = {
  q: Bilingual;
  a: Bilingual;
};

type LocaleCopy = {
  nav: {
    menu: string;
    locations: string;
    booking: string;
  };
  hero: {
    line1: string;
    line2: string;
    ticker: string;
  };
  common: {
    scroll: string;
    tasteFxTop: string;
    tasteFxBottom: string;
  };
  about: {
    kicker: string;
    title1: string;
    title2: string;
    body: string;
  };
  menu: {
    kicker: string;
    title1: string;
    title2: string;
  };
  findUs: {
    kicker: string;
    title1: string;
    title2: string;
    todaySpot: string;
    openInMaps: string;
  };
  gallery: {
    kicker: string;
    title1: string;
    title2: string;
    follow: string;
    alt: string;
  };
  faq: {
    kicker: string;
    title1: string;
    title2: string;
  };
  booking: {
    toggle: string;
    title: string;
    body: string;
    line: string;
    instagram: string;
    email: string;
  };
  footer: {
    line: string;
    menu: string;
    findUs: string;
    faq: string;
    booking: string;
    visitors: string;
    copyright: string;
  };
  floating: {
    findNow: string;
    booking: string;
    instagram: string;
  };
  languageToggle: {
    aria: string;
    ja: string;
    en: string;
  };
};

const menuItems: MenuItem[] = [
  {
    id: "classic",
    name: {
      ja: "忍者星 クラシック",
      en: "Ninja Star Classic",
    },
    shape: {
      ja: "手裏剣カット 4刃",
      en: "4-Point Shuriken Cut",
    },
    flavor: {
      ja: "シーソルト + ゴールドシーズニング",
      en: "Sea Salt + Potato Gold Dust",
    },
    price: "¥700",
    desc: {
      ja: "軽やかでカリッとした定番の手裏剣フライ。食べ歩きでもシェアしやすい一番人気。",
      en: "Our original shuriken fries. Light, crisp, and easy to share while walking.",
    },
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ketchup",
    name: {
      ja: "ケチャップレッド ストライク",
      en: "Ketchup Red Strike",
    },
    shape: {
      ja: "手裏剣カット 6刃",
      en: "6-Point Shuriken Cut",
    },
    flavor: {
      ja: "トマトケチャップ + チリスパーク",
      en: "Tomato Ketchup + Chili Spark",
    },
    price: "¥780",
    desc: {
      ja: "甘みのあとにピリッとキック。最初のひと口で思わず笑顔になる味に仕上げました。",
      en: "Sweet, bold, and slightly spicy. Built for that first bite that makes people stop and smile.",
    },
    image:
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "wasabi",
    name: {
      ja: "ワサビミント ダッシュ",
      en: "Wasabi Mint Dash",
    },
    shape: {
      ja: "手裏剣カット 8刃",
      en: "8-Point Shuriken Cut",
    },
    flavor: {
      ja: "ワサビミント + ライム",
      en: "Wasabi Mint + Lime",
    },
    price: "¥820",
    desc: {
      ja: "爽快感のある香りと刺激が特徴。新しい味に挑戦したい旅行者に人気です。",
      en: "Fresh, cool, and surprising. A favorite for travelers looking for a bold local flavor.",
    },
    image:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "triple",
    name: {
      ja: "トリプルシャドー ボックス",
      en: "Triple Shadow Box",
    },
    shape: {
      ja: "ミックス手裏剣セット",
      en: "Mixed Shuriken Set",
    },
    flavor: {
      ja: "クラシック + ケチャップ + ワサビミント",
      en: "Classic + Ketchup Red + Wasabi Mint",
    },
    price: "¥1400",
    desc: {
      ja: "人気3フレーバーを1箱で食べ比べ。グループやファミリーのシェアにぴったりです。",
      en: "All signature flavors in one box. Ideal for groups, families, and photo moments.",
    },
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80",
  },
];

const stopsToday: Stop[] = [
  {
    numeral: "一",
    city: { ja: "浅草", en: "Asakusa" },
    area: {
      ja: "浅草寺 雷門エリア",
      en: "Senso-ji Kaminarimon Area",
    },
    time: "11:30 - 14:00",
    note: {
      ja: "日本の観光地で、忍者気分を楽しもう。",
      en: "Step into ninja mode while exploring Japan's iconic sights.",
    },
    map: "https://maps.google.com/?q=Asakusa+Sensoji",
    image:
      "https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    numeral: "二",
    city: { ja: "渋谷", en: "Shibuya" },
    area: {
      ja: "スクランブル交差点 周辺",
      en: "Scramble Crossing District",
    },
    time: "15:30 - 18:30",
    note: {
      ja: "夕方は撮影需要が高く、短い待機列が発生します。",
      en: "Evening is peak photo time, so short lines may form.",
    },
    map: "https://maps.google.com/?q=Shibuya+Scramble+Crossing",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=80",
  },
  {
    numeral: "三",
    city: { ja: "押上", en: "Oshiage" },
    area: {
      ja: "東京スカイツリー ソラマチ側",
      en: "Tokyo Skytree Solamachi Side",
    },
    time: "19:30 - 22:00",
    note: {
      ja: "忍者といえば夜。忍び込むための携帯食は NINJA POTATO で。",
      en: "Night is ninja time. Fuel your stealth mission with NINJA POTATO.",
    },
    map: "https://maps.google.com/?q=Tokyo+Skytree",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1400&q=80",
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

const faqItems: FaqItem[] = [
  {
    q: {
      ja: "ベジタリアン向けのメニューはありますか？",
      en: "Do you have vegetarian options?",
    },
    a: {
      ja: "あります。フライは植物性の素材を使い、専用の植物油で調理しています。",
      en: "Yes. Our fries are plant-based and cooked in dedicated vegetable oil.",
    },
  },
  {
    q: {
      ja: "味付けは辛いですか？",
      en: "Is the seasoning spicy?",
    },
    a: {
      ja: "クラシックはマイルド、ケチャップレッドは中辛、ワサビミントは刺激がシャープで後味は短めです。",
      en: "Classic is mild, Ketchup Red is medium, and Wasabi Mint is sharp but short-lived.",
    },
  },
  {
    q: {
      ja: "カードやモバイル決済は使えますか？",
      en: "Can I pay by card or mobile wallet?",
    },
    a: {
      ja: "はい。主要クレジットカード、交通系IC、Apple Pay、Google Pay に対応しています。",
      en: "Yes. We accept major cards, IC cards, Apple Pay, and Google Pay.",
    },
  },
  {
    q: {
      ja: "ハラール向けの選択肢はありますか？",
      en: "Do you have halal-friendly options?",
    },
    a: {
      ja: "フライ自体に豚由来原料・アルコール原料は使用していません。最新のアレルゲン表はスタッフにお声がけください。",
      en: "Our fries do not contain pork or alcohol ingredients. Please ask staff for the latest allergen sheet.",
    },
  },
  {
    q: {
      ja: "イベント出店は依頼できますか？",
      en: "Can I request the truck for events?",
    },
    a: {
      ja: "可能です。商業施設、地域フェス、学校イベント、ブランド企画まで幅広く対応しています。",
      en: "Yes. We support pop-ups, festivals, school events, and brand activations.",
    },
  },
];

const localeCopy: Record<Locale, LocaleCopy> = {
  ja: {
    nav: {
      menu: "メニュー",
      locations: "出店先",
      booking: "出店依頼",
    },
    hero: {
      line1: "日本潜入ミッションの",
      line2: "ための携帯食。",
      ticker:
        "NINJA POTATO / 見つける / 撮る / かじる / TOKYO STREET MISSION / NINJA POTATO / 見つける / 撮る / かじる / TOKYO STREET MISSION /",
    },
    common: {
      scroll: "SCROLL",
      tasteFxTop: "FAV",
      tasteFxBottom: "FLAVOR",
    },
    about: {
      kicker: "What is NINJA POTATO?",
      title1: "潜入",
      title2: "携帯食",
      body: "NINJA POTATO は、日本を巡るための“携帯できる潜入食”をコンセプトにしています。手裏剣型のフライドポテトを提供し、観光地で偶然見つける楽しさをぜひご堪能ください。",
    },
    menu: {
      kicker: "メニュー",
      title1: "GOLDEN",
      title2: "LOADOUT",
    },
    findUs: {
      kicker: "Find us today",
      title1: "LIVE",
      title2: "ROUTE",
      todaySpot: "本日の出店先",
      openInMaps: "地図で開く",
    },
    gallery: {
      kicker: "Gallery / Instagram",
      title1: "SPOT IT",
      title2: "SHARE IT",
      follow: "@ninjapotato.jp をフォロー",
      alt: "NINJA POTATO ギャラリー",
    },
    faq: {
      kicker: "FAQ",
      title1: "QUICK",
      title2: "ANSWERS",
    },
    booking: {
      toggle: "出店のご相談受付中",
      title: "出店のご依頼を受け付けています",
      body: "商業施設、観光地イベント、ホテル前スペース、地域フェスなど、訪日客が多いロケーションでの出店相談に対応します。",
      line: "LINE公式",
      instagram: "Instagram",
      email: "メール",
    },
    footer: {
      line: "Find it. Snap it. Crunch it.",
      menu: "メニュー",
      findUs: "本日の出店先",
      faq: "FAQ",
      booking: "出店依頼",
      visitors: "日本の人気観光地を巡る来訪者のために設計。",
      copyright: "© 2026 NINJA POTATO",
    },
    floating: {
      findNow: "📍 今いる場所を見る",
      booking: "🚚 出店相談",
      instagram: "◎ Instagram",
    },
    languageToggle: {
      aria: "表示言語の切り替え",
      ja: "日本語",
      en: "English",
    },
  },
  en: {
    nav: {
      menu: "Menu",
      locations: "Locations",
      booking: "Booking",
    },
    hero: {
      line1: "Portable snack for your",
      line2: "Japan stealth mission.",
      ticker:
        "NINJA POTATO / FIND IT / SNAP IT / CRUNCH IT / TOKYO STREET MISSION / NINJA POTATO / FIND IT / SNAP IT / CRUNCH IT / TOKYO STREET MISSION /",
    },
    common: {
      scroll: "SCROLL",
      tasteFxTop: "FAV",
      tasteFxBottom: "FLAVOR",
    },
    about: {
      kicker: "What is NINJA POTATO?",
      title1: "STEALTH",
      title2: "SNACK",
      body: "NINJA POTATO is built around the idea of a portable stealth snack for traveling across Japan. We serve shuriken-shaped fries and invite you to enjoy the thrill of discovering them by chance in busy sightseeing spots.",
    },
    menu: {
      kicker: "Menu",
      title1: "GOLDEN",
      title2: "LOADOUT",
    },
    findUs: {
      kicker: "Find us today",
      title1: "LIVE",
      title2: "ROUTE",
      todaySpot: "Today's Spot",
      openInMaps: "Open in Maps",
    },
    gallery: {
      kicker: "Gallery / Instagram",
      title1: "SPOT IT",
      title2: "SHARE IT",
      follow: "Follow @ninjapotato.jp",
      alt: "NINJA POTATO gallery",
    },
    faq: {
      kicker: "FAQ",
      title1: "QUICK",
      title2: "ANSWERS",
    },
    booking: {
      toggle: "Now accepting pop-up location requests",
      title: "Bring NINJA POTATO to your location",
      body: "We accept pop-up requests for shopping complexes, tourism events, hotel-front spaces, and local festivals with strong inbound visitor flow.",
      line: "LINE Official",
      instagram: "Instagram",
      email: "Email",
    },
    footer: {
      line: "Find it. Snap it. Crunch it.",
      menu: "Menu",
      findUs: "Find us today",
      faq: "FAQ",
      booking: "Booking",
      visitors: "Built for visitors exploring Japan's busiest sightseeing zones.",
      copyright: "© 2026 NINJA POTATO",
    },
    floating: {
      findNow: "📍 Find us now",
      booking: "🚚 Book the truck",
      instagram: "◎ Instagram",
    },
    languageToggle: {
      aria: "Change language",
      ja: "Japanese",
      en: "English",
    },
  },
};

const HeroLogo = () => (
  <div className="velocity-logo" aria-hidden="true">
    <span />
  </div>
);

const HeroNav = ({ copy }: { copy: LocaleCopy }) => (
  <div className="velocity-nav">
    <p className="velocity-coords">
      35° 41&apos; 22&quot; N, 139° 41&apos; 30&quot; E
      <br />
      TOKYO, JAPAN
    </p>
    <HeroLogo />
    <nav className="velocity-links">
      <a href="#menu">{copy.nav.menu}</a>
      <a href="#find-us">{copy.nav.locations}</a>
      <a href="#booking">{copy.nav.booking}</a>
    </nav>
  </div>
);

const HeroCenterCopy = ({ copy }: { copy: LocaleCopy }) => (
  <div className="velocity-center">
    <img
      src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80"
      alt="Shuriken fries close-up"
      className="velocity-center-image"
    />
    <h1 className="velocity-center-title">
      {copy.hero.line1}
      <br />
      {copy.hero.line2}
      <br />
      <span>NINJA POTATO</span>
    </h1>
  </div>
);

const HeroScrollRails = ({ label }: { label: string }) => (
  <>
    <div className="velocity-scroll velocity-scroll-left">
      <span>{label}</span>
      <FiArrowDown />
    </div>
    <div className="velocity-scroll velocity-scroll-right">
      <span>{label}</span>
      <FiArrowDown />
    </div>
  </>
);

const LanguageToggle = ({
  locale,
  onChange,
  copy,
}: {
  locale: Locale;
  onChange: (next: Locale) => void;
  copy: LocaleCopy["languageToggle"];
}) => (
  <div className="floating-language" role="group" aria-label={copy.aria}>
    <span className={`floating-language-glider ${locale === "en" ? "is-en" : "is-ja"}`} />
    <button
      type="button"
      className={`floating-language-option ${locale === "ja" ? "is-active" : ""}`}
      aria-pressed={locale === "ja"}
      onClick={() => onChange("ja")}
    >
      <span>JP</span>
      <small>{copy.ja}</small>
    </button>
    <button
      type="button"
      className={`floating-language-option ${locale === "en" ? "is-active" : ""}`}
      aria-pressed={locale === "en"}
      onClick={() => onChange("en")}
    >
      <span>EN</span>
      <small>{copy.en}</small>
    </button>
  </div>
);

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [activeStop, setActiveStop] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollVelocity = useVelocity(scrollYProgress);
  const skewXRaw = useTransform(scrollVelocity, [-1, 1], ["34deg", "-34deg"]);
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -2800]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

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

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("np-locale");
    if (savedLocale === "ja" || savedLocale === "en") {
      setLocale(savedLocale);
      return;
    }
    const detected = navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
    setLocale(detected);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("np-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const copy = localeCopy[locale];

  return (
    <div className="ninja-root">
      <main>
        <section ref={heroRef} className="hero">
          <div className="hero-stage">
            <HeroNav copy={copy} />
            <HeroCenterCopy copy={copy} />
            <motion.p style={{ skewX, x }} className="velocity-marquee">
              {copy.hero.ticker}
            </motion.p>
            <HeroScrollRails label={copy.common.scroll} />
          </div>
        </section>

        <section className="section about" id="about">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">{copy.about.kicker}</p>
            <div>
              <h2>{copy.about.title1}</h2>
              <h2>{copy.about.title2}</h2>
            </div>
          </motion.div>
          <motion.p
            className="about-copy"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            {copy.about.body}
          </motion.p>
        </section>

        <section className="section menu" id="menu">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-kicker">{copy.menu.kicker}</p>
            <div>
              <h2>{copy.menu.title1}</h2>
              <h2>{copy.menu.title2}</h2>
            </div>
          </motion.div>
          <div className="menu-list">
            {menuItems.map((item, index) => {
              const isHovered = hoveredMenu === item.id;
              return (
                <motion.article
                  key={item.id}
                  className="menu-card"
                  initial={{ opacity: 0, y: 120, filter: "blur(12px)", scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.95,
                    delay: index * 0.12,
                    ease: [0.12, 0.23, 0.5, 1],
                  }}
                  onMouseEnter={() => setHoveredMenu(item.id)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <div className="menu-copy">
                    <div className="menu-meta">
                      <span>{item.shape[locale]}</span>
                      <span>{item.flavor[locale]}</span>
                    </div>
                    <h3>{item.name[locale]}</h3>
                    <p>{item.desc[locale]}</p>
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
                      {copy.common.tasteFxTop}
                      <br />
                      {copy.common.tasteFxBottom}
                    </motion.div>
                  </div>
                  <div className="menu-media">
                    <motion.img
                      src={item.image}
                      alt={item.name[locale]}
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
            <p className="section-kicker">{copy.findUs.kicker}</p>
            <div>
              <h2>{copy.findUs.title1}</h2>
              <h2>{copy.findUs.title2}</h2>
            </div>
          </motion.div>
          <div className="find-grid">
            <div className="route-list">
              {stopsToday.map((stop, index) => {
                const active = activeStop === index;
                return (
                  <motion.button
                    key={stop.map}
                    className={`route-item ${active ? "is-active" : ""}`}
                    onClick={() => setActiveStop(index)}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{stop.numeral}</p>
                    <div>
                      <p>{stop.city[locale]}</p>
                      <p>{stop.area[locale]}</p>
                      <p>{stop.time}</p>
                      <p>{stop.note[locale]}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <div className="route-visual">
              <AnimatePresence mode="wait">
                <motion.img
                  key={stopsToday[activeStop].image}
                  src={stopsToday[activeStop].image}
                  alt={stopsToday[activeStop].area[locale]}
                  initial={{ opacity: 0, scale: 1.08, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -16 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
              <div className="route-caption">
                <p>{copy.findUs.todaySpot}</p>
                <h3>{stopsToday[activeStop].area[locale]}</h3>
                <p>{stopsToday[activeStop].time}</p>
                <a href={stopsToday[activeStop].map} target="_blank" rel="noreferrer">
                  {copy.findUs.openInMaps}
                </a>
              </div>
            </div>
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
            <p className="section-kicker">{copy.gallery.kicker}</p>
            <div>
              <h2>{copy.gallery.title1}</h2>
              <h2>{copy.gallery.title2}</h2>
            </div>
            <a className="section-link" href="https://instagram.com" target="_blank" rel="noreferrer">
              {copy.gallery.follow}
            </a>
          </motion.div>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <motion.img
                key={image}
                src={image}
                alt={copy.gallery.alt}
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
            <p className="section-kicker">{copy.faq.kicker}</p>
            <div>
              <h2>{copy.faq.title1}</h2>
              <h2>{copy.faq.title2}</h2>
            </div>
          </div>
          <div className="faq-grid">
            {faqItems.map((item, index) => {
              const open = openFaq === index;
              return (
                <button
                  key={item.q.en}
                  className={`faq-item ${open ? "is-open" : ""}`}
                  onClick={() => setOpenFaq(open ? -1 : index)}
                >
                  <div className="faq-row">
                    <p>{item.q[locale]}</p>
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
                        {item.a[locale]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </section>

        <section className="section final-cta" id="booking">
          <motion.button
            className={`final-cta-toggle ${bookingOpen ? "is-open" : ""}`}
            onClick={() => setBookingOpen((prev) => !prev)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6 }}
          >
            <p>{copy.booking.toggle}</p>
            <span>{bookingOpen ? "−" : "+"}</span>
          </motion.button>
          <AnimatePresence initial={false}>
            {bookingOpen && (
              <motion.div
                className="final-cta-panel"
                initial={{ opacity: 0, height: 0, y: 18 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.12, 0.23, 0.5, 1] }}
              >
                <h2>{copy.booking.title}</h2>
                <p>{copy.booking.body}</p>
                <div>
                  <a href="https://line.me/R/ti/p/@ninjapotato" target="_blank" rel="noreferrer">
                    {copy.booking.line}
                  </a>
                  <a href="https://instagram.com/ninjapotato.jp" target="_blank" rel="noreferrer">
                    {copy.booking.instagram}
                  </a>
                  <a href="mailto:booking@ninjapotato.jp">{copy.booking.email}</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <p>NINJA POTATO</p>
          <p>{copy.footer.line}</p>
        </div>
        <div className="footer-links">
          <a href="#menu">{copy.footer.menu}</a>
          <a href="#find-us">{copy.footer.findUs}</a>
          <a href="#faq">{copy.footer.faq}</a>
          <a href="#booking">{copy.footer.booking}</a>
        </div>
        <div className="footer-bottom">
          <p>{copy.footer.visitors}</p>
          <p>{copy.footer.copyright}</p>
        </div>
      </footer>

      <div className="floating-actions">
        <a href="#find-us">{copy.floating.findNow}</a>
        <a href="#booking">{copy.floating.booking}</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          {copy.floating.instagram}
        </a>
      </div>
      <LanguageToggle locale={locale} onChange={setLocale} copy={copy.languageToggle} />
    </div>
  );
}
