/**
 * Demo görselleri için yardımcı. loremflickr, anahtar kelimeye uygun gerçek
 * fotoğrafları güvenilir şekilde döndürür; `lock` aynı görselin sabit
 * kalmasını sağlar. Görsel yüklenmezse arayüz zarif bir fallback gösterir.
 */
export const photo = (tags: string, lock: number, w = 640, h = 640) =>
  `https://loremflickr.com/${w}/${h}/${tags}?lock=${lock}`;
