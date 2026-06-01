# Pati Tek Petshop — Demo

Modern, tamamen Türkçe bir petshop tanıtım + e-ticaret demo'su. Backend ve
gerçek ödeme yoktur; sepet ve ürün yönetimi tarayıcıda (localStorage) çalışır.

## Çalıştırma

```bash
npm install
npm run dev      # geliştirme sunucusu (http://localhost:5173)
npm run build    # production derlemesi (dist/)
npm run preview  # derlenmiş sürümü önizleme
```

## Özellikler

- **Ana Sayfa** — hero, kategoriler, öne çıkan ürünler, hizmetler, kampanya, yorumlar
- **Mağaza** — kategori/arama filtreleri, sıralama, URL ile paylaşılabilir filtre durumu
- **Ürün Detay** — adet seçimi, sepete ekleme, benzer ürünler
- **Sepet** — yan çekmece + sepet sayfası, demo sipariş akışı (ödeme yok)
- **Hakkımızda / Hizmetler / İletişim** — tanıtım sayfaları ve demo iletişim formu
- **Yönetim Paneli** (`/admin`) — ürün ekle/düzenle/sil, stok istatistikleri,
  başlangıç verisine sıfırlama. Değişiklikler localStorage'a kaydedilir.

## Teknoloji

Vite + React 19 + TypeScript + React Router. CSS değişkenleriyle kurulu
tasarım sistemi, harici görsel bağımlılığı yoktur (ürün görselleri kategori
renklerine göre stilize edilmiş emoji panelleridir).

## Yapı

```
src/
├── components/   # layout, ui, home, cart, admin bileşenleri
├── context/      # CartContext, ProductsContext (localStorage)
├── data/         # ürün, kategori, hizmet verileri
├── hooks/        # useLocalStorage
├── lib/          # fiyat biçimlendirme
├── pages/        # sayfa bileşenleri
├── styles/       # tasarım token'ları + global stiller
└── types/        # paylaşılan tip tanımları
```
