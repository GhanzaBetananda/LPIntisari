import { useEffect, useState } from "react";
import "./App.css";

const TRYOUT_URL = "https://tryout-intisari-1.vercel.app/";

/* ---------- icon kecil (inline SVG) ---------- */
const Icon = ({ name, size = 22 }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "monitor":
      return (
        <svg {...props}>
          <rect x="2.5" y="4" width="19" height="13" rx="2" />
          <path
            d="M8 21h8M12 17v4M6.5 13.5l3-4 2.5 2.5 2-3 2 4.5"
            strokeWidth="0"
            fill="none"
          />
          <path d="M7 13l2.6-3.4 2.2 2.2 1.9-2.4 2.3 3.6" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
          <path d="M8 7h8M8 10.5h6" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 20V4" />
          <path d="M4 20h16" />
          <path d="M8 16v-4M13 16V8M18 16v-6" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...props}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.7.5 1 1.3 1 2.1h5c0-.8.3-1.6 1-2.1A6 6 0 0 0 12 3z" />
        </svg>
      );
    case "target":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...props}>
          <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
          <path d="M8 5H5.5a2.5 2.5 0 0 0 2.6 4M16 5h2.5a2.5 2.5 0 0 1-2.6 4" />
          <path d="M12 13v3M8.5 20h7M10 16h4a1.5 1.5 0 0 1 1.5 1.5V20h-7v-2.5A1.5 1.5 0 0 1 10 16z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 2.5v5.8c0 4.6-3 8-7 9.7-4-1.7-7-5.1-7-9.7V5.5z" />
          <path d="M9 11.8l2.1 2.1 4-4.2" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M10.5 5.5h3M11 18.5h2" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 20c.6-3.4 2.8-5.3 5.5-5.3s4.9 1.9 5.5 5.3" />
          <path d="M15.5 5.4a3.2 3.2 0 0 1 .2 5.2M17.8 14.9c1.7.7 2.9 2.4 3.2 5.1" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M4.5 12.5l5 5L19.5 7" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...props}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    default:
      return null;
  }
};

/* ---------- logo ---------- */
const Logo = ({ inverted = false }) => (
  <a href="#beranda" className={`logo ${inverted ? "logo--inverted" : ""}`}>
    <span className="logo__mark" aria-hidden="true">
      <img src="/logo.png" alt="" width="34" height="34" />
    </span>
    <span className="logo__text">
      Bimbel <b>Intisari</b>
    </span>
  </a>
);

/* ---------- warna aksen per kartu ---------- */
const TONES = ["blue", "gold", "green", "purple", "red", "teal"];

/* ---------- data konten ---------- */
const FEATURES = [
  {
    icon: "monitor",
    title: "Simulasi CAT Persis BKN",
    desc: "Tampilan layar, timer dan navigasi soal semuanya direplikasi seperti ujian CAT asli, jadi hari-H akan semakin siap.",
  },
  {
    icon: "book",
    title: "Bank Soal Lengkap & Terupdate",
    desc: "Ribuan soal TIU, TWK, dan TKP disusun mengikuti regulasi terbaru (Permenpan RB) dan diperbarui rutin mengikuti tren soal tiap gelombang rekrutmen.",
  },
  {
    icon: "target",
    title: "Paket Khusus BASARNAS",
    desc: "Tryout menyesuaikan karakteristik formasi BASARNAS beserta materi wajib pasukan SAR, supaya latihanmu benar-benar kontekstual dengan instansi tujuan.",
  },
  {
    icon: "chart",
    title: "Riwayat & Status Kelulusan",
    desc: "Pantau riwayat pengerjaan tryout, perolehan nilai, serta status lulus atau tidak lulus berdasarkan KKM yang telah ditetapkan.",
  },
  {
    icon: "bulb",
    title: "Pembahasan oleh Mentor Berpengalaman",
    desc: "Setiap soal dilengkapi pembahasan mendalam dari mentor berpengalaman, disertai strategi dan tips praktis untuk membantu Anda memahami materi.",
  },
  {
    icon: "trophy",
    title: "Rekap Perkembangan Skor",
    desc: "Riwayat semua tryout tersimpan otomatis, kamu bisa memantau grafik skor dan melihat seberapa siap dirimu menuju garis lulus.",
  },
];

const PLUS = [
  {
    icon: "spark",
    title: "Update Mengikuti Tren Soal",
    desc: "Tim kurikulum Intisari menganalisis soal-soal terbaru setiap periode rekrutmen, lalu menyesuaikan bank soal agar kamu tidak latihan soal basi.",
  },
  {
    icon: "shield",
    title: "Uji Coba Paket",
    desc: "Jelajahi dan coba paket tryout yang tersedia sesuai kebutuhan persiapanmu.",
  },
  {
    icon: "clock",
    title: "Akses 24 Jam, Di Mana Saja",
    desc: "Web app ringan yang bisa dibuka dari laptop maupun HP, kapan pun mood latihan datang tanpa perlu instal aplikasi tambahan.",
  },
];

const STEPS = [
  {
    no: "01",
    title: "Buka Website Tryout",
    desc: "Kunjungi tryout-intisari-1.vercel.app dari perangkat apa pun. Tidak perlu instal apa pun.",
  },
  {
    no: "02",
    title: "Pilih Paket Tryout",
    desc: "Tentukan paket tryout CAT BKN / BASARNAS sesuai formasi yang kamu incar.",
  },
  {
    no: "03",
    title: "Tryout & Analisis",
    desc: "Kerjakan dalam kondisi ujian sungguhan, kemudian pelajari analisis skor dan pembahasannya.",
  },
  {
    no: "04",
    title: "Perbaiki & Ulangi",
    desc: "Fokus perbaiki subtes terlemah berdasarkan hasil analisis, lalu taklukkan tryout berikutnya.",
  },
];

const TESTIMONI = [
  {
    quote:
      "Tampilan simulasi CAT-nya mirip banget sama yang asli. Waktu ujian BKN kemarin saya jadi tenang karena sudah terbiasa dengan layarnya.",
    name: "Rafa Aditya",
    role: "Lulus SKD — Formasi BASARNAS",
  },
  {
    quote:
      "Favorit saya bagian analisis hasilnya. Grafik per subtes bikin saya tahu harus mulai belajar dari mana, nggak asal latihan.",
    name: "Nabila Putri",
    role: "Peserta Tryout CAT BKN",
  },
  {
    quote:
      "Soalnya upgrade terus mengikuti tren. Pembahasan trik cepatnya sangat membantu untuk TIU bagian deret angka dan hijaiyah.",
    name: "Dimas Prasetyo",
    role: "Peserta Bimbingan Intensif",
  },
];

const FAQ = [
  {
    q: "Apakah tryout di Bimbel Intisari benar-benar sama seperti CAT BKN asli?",
    a: "Ya. Simulasi kami meniru antarmuka CAT BKN sistem pilihan ganda di layar, timer per sesi, dan batas waktu khas SKD. Tujuannya agar saat ujian asli, kamu tidak butuh waktu adaptasi.",
  },
  {
    q: "Apa itu paket khusus BASARNAS?",
    a: "Paket khusus BASARNAS adalah tryout yang materinya menyesuaikan karakteristik formasi dan konten tks instansi BASARNAS mulai dari tes dasar SKD hingga armamen/pengamatan mencari-cari yang biasa muncul pada tahap seleksi tertentu.",
  },
  {
    q: "Apakah ada perpanjangan hari untuk pengerjaan tryout yang sedang berlangsung?",
    a: "Ada. Peserta dapat mengajukan perpanjangan hari pengerjaan tryout sesuai ketentuan yang berlaku.",
  },
  {
    q: "Bisakah akses dari HP atau tablet?",
    a: "Bisa. Website tryout berbasis web app yang responsif tampil optimal di laptop, tablet, maupun HP tanpa perlu instal aplikasi tambahan.",
  },
  {
    q: "Bagaimana cara daftar / mulai tryout?",
    a: 'Cukup klik tombol "Mulai Tryout Sekarang" di halaman ini. Kamu akan diarahkan langsung ke website tryout Bimbel Intisari.',
  },
];

const NAV_LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#fitur", label: "Fitur Terkini" },
  { href: "#kelebihan", label: "Kelebihan" },
  { href: "#langkah", label: "Cara Mulai" },
  { href: "#faq", label: "FAQ" },
];

/* ---------- sub-komponen UI ---------- */
const ButtonPrimary = ({ href, children, className = "" }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className={`btn btn--primary ${className}`}
  >
    {children}
  </a>
);

const ButtonGhost = ({ href, children, className = "" }) => (
  <a href={href} className={`btn btn--ghost ${className}`}>
    {children}
  </a>
);

const SectionHead = ({ kicker, title, desc, center = true }) => (
  <div
    className={`section-head reveal ${center ? "section-head--center" : ""}`}
  >
    <span className="kicker">{kicker}</span>
    <h2 className="section-title">{title}</h2>
    {desc && <p className="section-desc">{desc}</p>}
  </div>
);

/* ---------- App ---------- */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setShowBar(window.scrollY > 640);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal--show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="page" id="beranda">
      {/* ===== NAVBAR ===== */}
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="container nav__inner">
          <Logo />
          <nav className={`nav__links ${menuOpen ? "is-open" : ""}`}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a
              className="btn btn--primary nav__cta-mobile"
              href={TRYOUT_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Mulai Tryout <Icon name="arrow" size={16} />
            </a>
          </nav>
          <div className="nav__right">
            <ButtonPrimary href={TRYOUT_URL} className="nav__cta">
              Mulai Tryout <Icon name="arrow" size={16} />
            </ButtonPrimary>
            <button
              className={`burger ${menuOpen ? "is-active" : ""}`}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="hero__badge reveal">
              <Icon name="spark" size={15} /> Platform Tryout CAT BKN & BASARNAS
            </span>
            <h1 className="hero__title reveal">
              Raih <span className="grad">NIP Impian</span> dengan Tryout CAT
              BKN & BASARNAS
            </h1>
            <p className="hero__desc reveal">
              Bimbel Intisari adalah bimbingan persiapan seleksi CPNS yang fokus
              pada simulasi CAT BKN dan tryout khusus BASARNAS dengan bank
              soal terkini, analisis hasil otomatis, dan pengalaman ujian yang
              terasa nyata.
            </p>
            <div className="hero__actions reveal">
              <ButtonPrimary href={TRYOUT_URL}>
                Mulai Tryout Sekarang <Icon name="arrow" size={17} />
              </ButtonPrimary>
              <ButtonGhost href="#fitur">Lihat Fitur Terkini</ButtonGhost>
            </div>
            <ul className="hero__points reveal">
              {[
                "Ada paket tryout berkualitas",
                "Antarmuka persis CAT asli",
                "Analisis skor setiap tryout",
              ].map((t) => (
                <li key={t}>
                  <Icon name="check" size={15} /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual reveal" aria-hidden="true">
            <div className="mock">
              <div className="mock__bar">
                <span className="dot" /> <span className="dot" />{" "}
                <span className="dot" />
                <span className="mock__url">tryout-intisari.vercel.app</span>
              </div>
              <div className="mock__body">
                <div className="mock__head">
                  <div>
                    <p className="mock__sub">SIMULASI CAT BKN 2026</p>
                    <h3>Sesi 1 — Tes Wawasan Kebangsaan</h3>
                  </div>
                  <span className="mock__timer">
                    <Icon name="clock" size={16} /> 01:02:47
                  </span>
                </div>
                <div className="mock__question">
                  <span className="mock__tag">Soal 37 dari 150</span>
                  <p>
                    Garis besarnya otonomi daerah di Indonesia diatur dalam UU
                    No. 23 Tahun 2014. Karena itu, yang <b>tidak</b> termasuk
                    fungsi pemerintahan provinsi adalah…
                  </p>
                  <div className="mock__opt">
                    <span>A</span> Pemerintah yang menyangkut kepentingan
                    nasional
                  </div>
                  <div className="mock__opt mock__opt--picked">
                    <span>B</span> Pemerintah yang menyangkut kepentingan daerah
                  </div>
                  <div className="mock__opt">
                    <span>C</span> Pemerintahan yang bersifat asimetris
                  </div>
                </div>
                <div className="mock__nav">
                  <span>‹ Sebelumnya (nonaktif)</span>
                  <span className="mock__next">Soal Berikutnya ›</span>
                </div>
              </div>
            </div>
            <div className="float-card float-card--one">
              <Icon name="chart" size={20} />
              <div>
                <b>Prediksi Skor</b>
                <span>324 / 550 — naik 39 pts</span>
              </div>
            </div>
            <div className="float-card float-card--two">
              <Icon name="trophy" size={20} />
              <div>
                <b>Peringkat #87</b>
                <span>dari 2.340 peserta tryout</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container hero__stats reveal">
          {[
            ["5.000+", "Soal latihan & pembahasan"],
            ["30+", "Paket tryout BKN & BASARNAS"],
            ["24/7", "Akses latihan dari perangkat apa pun"],
            ["15+", "Materi regulasi & Referensi Basarnas"],
          ].map(([n, t]) => (
            <div className="stat" key={t}>
              <b>{n}</b>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FITUR ===== */}
      <section className="section" id="fitur">
        <div className="container">
          <SectionHead
            kicker="Fitur Terkini"
            title="Semua yang Kamu Butuhkan untuk Tembus"
            desc="Fitur-fitur terbaru di platform Bimbel Intisari dirancang khusus untuk persiapan CAT BKN dan seleksi BASARNAS"
          />
          <div className="grid-3">
            {FEATURES.map((f, i) => (
              <article
                className={`feature reveal tone-${TONES[i % TONES.length]}`}
                key={f.title}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <span className="feature__icon">
                  <Icon name={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KELEBIHAN ===== */}
      <section className="section section--soft" id="kelebihan">
        <div className="container plus__inner">
          <div className="plus__intro reveal">
            <SectionHead
              center={false}
              kicker="Kelebihan Intisari"
              title="Kenapa Ribuan Calon ASN Nempel di Intisari?"
              desc="Bukan sekadar kumpulan soal. Intisari adalah sistem latihan lengkap dari simulasi, analisis, sampai strategi yang bikin persiapanmu terarah dan terukur."
            />
            <ul className="plus__list">
              {PLUS.map((p, i) => (
                <li
                  className="reveal"
                  key={p.title}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="plus__ico">
                    <Icon name={p.icon} size={18} />
                  </span>
                  <div>
                    <b>{p.title}</b>
                    <p>{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="plus__cta reveal">
              <ButtonPrimary href={TRYOUT_URL}>
                Coba Tryout Sekarang <Icon name="arrow" size={17} />
              </ButtonPrimary>
              <span className="plus__note">
                langsung di browser
              </span>
            </div>
          </div>

          <div className="plus__panel reveal">
            <div className="score-card">
              <p className="score-card__label">HASIL TRYOUT TERAKHIR</p>
              <h4>Tes Wawasan Kebangsaan</h4>
              <div className="score-card__big">
                <b>78</b>
                <span>/ 100 · Benar 62 · Salah 12 · Kosong 1</span>
              </div>
              <div className="bar">
                <span className="bar__row">
                  <em>Pemahaman literasi</em>
                  <i>
                    <b style={{ width: "85%" }} />
                  </i>
                </span>
                <span className="bar__row">
                  <em>Penalaran analitik</em>
                  <i>
                    <b style={{ width: "64%" }} />
                  </i>
                </span>
                <span className="bar__row">
                  <em>Hirarki peraturan</em>
                  <i>
                    <b style={{ width: "48%" }} />
                  </i>
                </span>
              </div>
              <div className="score-card__note">
                <Icon name="bulb" size={16} />
                <p>
                  Rekomendasi Intisari: fokus perdalam 1.5 hari materi{" "}
                  <b>Hirarki Peraturan</b> lalu kerjakan ulang paket serupa pada
                  bidang ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LANGKAH ===== */}
      <section className="section" id="langkah">
        <div className="container">
          <SectionHead
            kicker="Cara Mulai"
            title="Cuma 4 Langkah Menuju Tryout"
            desc="Tanpa instal, tanpa ribet. Semua bisa dimulai dalam 30 detik."
          />
          <div className="steps">
            {STEPS.map((s, i) => (
              <div
                className="step reveal"
                key={s.no}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="step__no">{s.no}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="steps-cta reveal">
            <ButtonPrimary href={TRYOUT_URL} className="btn--lg">
              Mulai Tryout Sekarang <Icon name="arrow" size={17} />
            </ButtonPrimary>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="section section--soft" id="testimoni">
        <div className="container">
          <SectionHead
            kicker="Kata Mereka"
            title="Cerita Para Peserta"
            desc="Dari peserta yang masih baru sampai calon ASN yang terbiasa menghadapi CAT ini pengalaman bersama Intisari."
          />
          <div className="grid-3">
            {TESTIMONI.map((t, i) => (
              <figure
                className="quote reveal"
                key={t.name}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="quote__stars" aria-hidden="true">
                  ★★★★★
                </div>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span className="quote__ava">{t.name[0]}</span>
                  <span>
                    <b>{t.name}</b>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq">
        <div className="container faq">
          <SectionHead
            kicker="Tanya-Jawab"
            title="Pertanyaan yang Sering Muncul"
          />
          <div className="faq__list reveal">
            {FAQ.map((f, i) => (
              <div
                className={`faq__item ${openFaq === i ? "is-open" : ""}`}
                key={f.q}
              >
                <button
                  className="faq__q"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <Icon name="chevron" size={18} />
                </button>
                <div
                  className="faq__a"
                  style={{ maxHeight: openFaq === i ? "260px" : 0 }}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="faq__foot reveal">
            Masih ada pertanyaan lain?{" "}
            <a href={TRYOUT_URL} target="_blank" rel="noreferrer">
              Coba langsung tryout!
              <Icon name="arrow" size={14} />
            </a>
          </p>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="cta">
        <div className="container cta__inner reveal">
          <span className="kicker kicker--gold">Siap Tempur?</span>
          <h2>Kerjakan Tryout Pertamamu Hari Ini</h2>
          <p>
            Perkenalan gratis, langsung terasa seperti ujian asli. Klik tombol
            di bawah dan kamu akan diarahkan ke website official tryout Bimbel
            Intisari.
          </p>
          <div className="cta__url" aria-hidden="true">
            <span>tryout-intisari-1.vercel.app</span>
          </div>
          <ButtonPrimary href={TRYOUT_URL} className="btn--lg cta__btn">
            Buka Website Tryout 
          </ButtonPrimary>
          <small className="cta__foot">
            tryout-intisari-1.vercel.app — paket tersedia
          </small>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <Logo inverted />
            <p>
              Bimbingan persiapan seleksi ASN, fokus pada tryout CAT BKN dan
              BASARNAS — latihan terarah, analisis terukur, hasil terbukti.
            </p>
          </div>
          <div className="footer__col">
            <h4>Navigasi</h4>
            <a href="#fitur">Fitur Terkini</a>
            <a href="#kelebihan">Kelebihan</a>
            <a href="#langkah">Cara Mulai</a>
            <a href="#testimoni">Testimoni</a>
          </div>
          <div className="footer__col">
            <h4>Tryout</h4>
            <a href={TRYOUT_URL} target="_blank" rel="noreferrer">
              Tryout CAT BKN
            </a>
            <a href={TRYOUT_URL} target="_blank" rel="noreferrer">
              Tryout BASARNAS
            </a>
            <a href={TRYOUT_URL} target="_blank" rel="noreferrer">
              Paket Tersedia
            </a>
          </div>
        
        </div>
        <div className="container footer__base">
          <span>
            © {new Date().getFullYear()} Bimbel Intisari. Seluruh hak cipta
            dilindungi.
          </span>
          <span>Dibuat dengan semangat ASN 🇮🇩</span>
        </div>
      </footer>

      {/* ===== CTA BAR (khusus layar kecil / Android) ===== */}
      <div
        className={`cta-bar ${showBar && !menuOpen ? "is-visible" : ""}`}
        aria-hidden={!showBar || menuOpen}
      >
        <div className="cta-bar__text">
          <b>Coba Tryout!</b>
          <span>Simulasi CAT BKN &amp; BASARNAS</span>
        </div>
        <a
          className="cta-bar__btn"
          href={TRYOUT_URL}
          target="_blank"
          rel="noreferrer"
        >
          Mulai
        </a>
      </div>
    </div>
  );
}

export default App;
