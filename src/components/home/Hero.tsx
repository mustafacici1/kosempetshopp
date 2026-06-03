import { useEffect, useRef } from "react";
import { ButtonLink } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { PawMark } from "../ui/PawMark";
import { useReveal } from "../../hooks/useReveal";
import { photo } from "../../lib/photos";
import "./home.css";

// Dekoratif pati izleri (konum + boyut + açı + parallax katsayısı)
const paws = [
  { top: "14%", left: "6%", size: 26, rot: -18, depth: 24 },
  { top: "70%", left: "12%", size: 20, rot: 12, depth: 16 },
  { top: "30%", left: "44%", size: 16, rot: 30, depth: 30 },
  { top: "82%", left: "40%", size: 22, rot: -8, depth: 12 },
];

export function Hero() {
  const ref = useReveal<HTMLElement>();
  const sceneRef = useRef<HTMLDivElement>(null);

  // Hafif fare-parallax: dekoratif katmanlara derinlik hissi verir.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", mx.toFixed(3));
        el.style.setProperty("--my", my.toFixed(3));
      });
    };
    const reset = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={ref}>
      <div className="hero__decor" aria-hidden="true">
        <span className="hero__dots hero__dots--1" />
        <span className="hero__dots hero__dots--2" />
        <span className="hero__ring" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content reveal">
          <span className="hero__eyebrow">
            <Icon name="location" size={15} /> Bursa/İnegöl · Köşem Petshop
          </span>
          <h1 className="hero__title">
            Mutlu patiler,
            <br />
            <span className="hero__hl">huzurlu evler</span>
          </h1>
          <p className="hero__lead">
            Premium mamalar, oyuncaklar ve bakım ürünleri; uzman tavsiyesi ve
            güler yüzlü hizmetle bir arada. Sevdiklerin için en iyisini seç.
          </p>

          <div className="hero__actions">
            <ButtonLink to="/magaza" size="lg">
              Alışverişe Başla <Icon name="arrow" size={18} />
            </ButtonLink>
            <ButtonLink to="/hizmetler" variant="ghost" size="lg">
              Hizmetlerimiz
            </ButtonLink>
          </div>

          <div className="hero__social-proof">
            <div className="hero__avatars" aria-hidden="true">
              <img src={photo("dog", 401, 80, 80)} alt="" loading="lazy" />
              <img src={photo("cat", 402, 80, 80)} alt="" loading="lazy" />
              <img src={photo("puppy", 403, 80, 80)} alt="" loading="lazy" />
              <span className="hero__avatars-more">1k+</span>
            </div>
            <div className="hero__proof-text">
              <span className="hero__stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={14} />
                ))}
              </span>
              <span>
                <strong>1.200+</strong> mutlu patili dost
              </span>
            </div>
          </div>
        </div>

        <div className="hero__scene reveal reveal--delay-1" ref={sceneRef}>
          <span className="hero__blob" aria-hidden="true" />
          <span className="hero__blob hero__blob--2" aria-hidden="true" />

          <div className="hero__photo">
            <img
              src={new URL("../../assets/main_page.jpg", import.meta.url).href}
              alt="Mutlu bir köpek"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Dönen indirim rozeti */}
          <div className="hero__badge" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="hero__badge-ring">
              <defs>
                <path
                  id="heroBadgePath"
                  d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                />
              </defs>
              <text>
                <textPath href="#heroBadgePath">
                  İLK SİPARİŞE %15 İNDİRİM • İLK SİPARİŞE %15 İNDİRİM •
                </textPath>
              </text>
            </svg>
            <span className="hero__badge-center">
              <PawMark size={22} />
            </span>
          </div>

          {/* Yüzen bilgi kartları */}
          <div className="hero__chip hero__chip--ship">
            <span className="hero__chip-icon">
              <Icon name="truck" size={18} />
            </span>
            <div>
              <strong>Aynı Gün Teslimat</strong>
              <span>İnegöl içi</span>
            </div>
          </div>

          <div className="hero__chip hero__chip--pay">
            <span className="hero__chip-icon hero__chip-icon--leaf">
              <Icon name="cash" size={18} />
            </span>
            <div>
              <strong>Kapıda Ödeme</strong>
              <span>Nakit & kart</span>
            </div>
          </div>

          {/* Serpiştirilmiş pati izleri */}
          {paws.map((p, i) => (
            <span
              key={i}
              className="hero__paw"
              style={
                {
                  top: p.top,
                  left: p.left,
                  "--paw-rot": `${p.rot}deg`,
                  "--paw-depth": p.depth,
                  animationDelay: `${i * 0.4}s`,
                } as React.CSSProperties
              }
            >
              <PawMark size={p.size} />
            </span>
          ))}
        </div>
      </div>

      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,90 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
