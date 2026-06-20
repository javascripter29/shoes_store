import { currencies } from "../data/currencies";
import type { Currency } from "../types/shop";

export const formatPrice = (value: number, currency: Currency) =>
  new Intl.NumberFormat(currencies[currency].locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value * currencies[currency].rate);
