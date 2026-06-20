import type { Currency } from "../types/shop";

export const currencies: Record<
  Currency,
  { label: string; locale: string; rate: number }
> = {
  UAH: { label: "UAH", locale: "uk-UA", rate: 1 },
  USD: { label: "USD", locale: "en-US", rate: 0.025 },
  EUR: { label: "EUR", locale: "de-DE", rate: 0.023 },
};
