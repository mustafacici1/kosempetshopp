const tl = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number) => tl.format(value);

export const discountPercent = (price: number, oldPrice?: number) =>
  oldPrice && oldPrice > price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;
