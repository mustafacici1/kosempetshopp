import { useState } from "react";
import { Icon } from "../components/ui/Icon";
import type { IconName } from "../components/ui/Icon";
import { useReveal } from "../hooks/useReveal";
import "./content-page.css";

const contactInfo: { icon: IconName; label: string; value: string; href?: string }[] = [
  {
    icon: "location",
    label: "Adres",
    value: "Bursa/İnegöl",
  },
  { icon: "phone", label: "Telefon", value: "0536 628 15 16", href: "tel:+905366281516" },
  { icon: "clock", label: "Çalışma Saatleri", value: "Her gün 09:00 – 21:00" },
  { icon: "card", label: "Ödeme", value: "Kapıda nakit ve kredi kartı" },
];

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const ref = useReveal<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="content-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">İletişim</span>
          <h1>Bize ulaş, seve seve yardımcı olalım</h1>
          <p>
            Ürünler, hizmetler veya patili dostun hakkında her türlü soru için
            buradayız.
          </p>
        </div>
      </section>

      <section className="section container contact-layout" ref={ref}>
        <div className="contact-info reveal">
          {contactInfo.map((c) => (
            <div className="contact-info__item" key={c.label}>
              <span className="contact-info__icon">
                <Icon name={c.icon} size={22} />
              </span>
              <div>
                <strong>{c.label}</strong>
                {c.href ? (
                  <p><a href={c.href}>{c.value}</a></p>
                ) : (
                  <p>{c.value}</p>
                )}
              </div>
            </div>
          ))}
          <a
            className="contact-info__ig"
            href="https://www.instagram.com/kosempetshopp/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="instagram" size={18} /> Instagram'da takip et
          </a>
          <div className="contact-map" aria-hidden="true">
            <Icon name="location" size={32} />
            <p>Bursa/İnegöl</p>
          </div>
        </div>

        <div className="contact-form-wrap reveal reveal--delay-1">
          {sent ? (
            <div className="contact-sent">
              <span className="contact-sent__icon">
                <Icon name="mail" size={30} />
              </span>
              <h2>Mesajın alındı!</h2>
              <p>
                En kısa sürede sana dönüş yapacağız. (Bu bir demo formudur,
                mesaj gönderilmez.)
              </p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}>
                Yeni mesaj gönder
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Mesaj gönder</h2>
              <label>
                Ad Soyad
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Adınız"
                />
              </label>
              <label>
                E-posta
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ornek@eposta.com"
                />
              </label>
              <label>
                Mesajınız
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Sormak istediğin her şey…"
                />
              </label>
              <button type="submit">Gönder</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
