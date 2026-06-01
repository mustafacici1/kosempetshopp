import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import LottieImport from "lottie-react";
import catAnimation from "../../assets/cat-animation.json";
import "./splash.css";

// Bazı paketleyici/ESM-CJS interop durumlarında default export
// { default: Component } şeklinde sarmalanabiliyor; ikisini de güvenle çöz.
const Lottie =
  ((LottieImport as unknown as { default?: ComponentType<Record<string, unknown>> })
    .default ?? LottieImport) as ComponentType<Record<string, unknown>>;

const MIN_DURATION = 2600;
const FADE_DURATION = 600;

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const visible = reduce ? 600 : MIN_DURATION;

    const leaveTimer = window.setTimeout(() => setLeaving(true), visible);
    const doneTimer = window.setTimeout(onDone, visible + FADE_DURATION);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash ${leaving ? "splash--leaving" : ""}`} role="status">
      <div className="splash__glow" aria-hidden="true" />

      <div className="splash__anim">
        <Lottie
          animationData={catAnimation}
          loop
          autoplay
          aria-label="Yükleniyor animasyonu"
        />
      </div>

      <p className="splash__text">Patili dostların hazırlanıyor…</p>

      <div className="splash__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
