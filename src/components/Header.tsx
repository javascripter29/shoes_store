import { ChevronDown, ShoppingBag, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { currencies } from "../data/currencies";
import { categories } from "../data/products";
import type { Category, Currency } from "../types/shop";

export function Header({
  activeCategory,
  chooseCategory,
  currency,
  setCurrency,
  totalItems,
}: {
  activeCategory: Category | "Все";
  chooseCategory: (category: Category | "Все") => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  totalItems: number;
}) {
  return (
    <header className="relative z-50 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur">
      <Link className="flex items-center gap-3" to="/">
        <div className="grid size-10 place-items-center rounded-md bg-emerald-400 text-zinc-950">
          <ShoppingBag size={22} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-lg font-black uppercase tracking-wide">Pulse Kicks</p>
          <p className="text-xs text-zinc-400">sneaker store</p>
        </div>
      </Link>

      <nav className="order-3 flex w-full items-center gap-2 sm:order-none sm:w-auto">
        <div className="group relative">
          <button
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-zinc-200 transition hover:bg-zinc-800 hover:text-emerald-300"
            type="button"
          >
            Каталог
            <ChevronDown
              className="transition group-hover:rotate-180"
              size={16}
            />
          </button>
          <div className="invisible absolute left-0 top-full z-[100] mt-2 w-56 rounded-lg border border-zinc-800 bg-zinc-950 p-2 opacity-0 shadow-2xl shadow-black/40 transition group-hover:visible group-hover:opacity-100">
            <button
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-emerald-400 hover:text-zinc-950 ${
                activeCategory === "Все" ? "text-emerald-300" : "text-zinc-300"
              }`}
              onClick={() => chooseCategory("Все")}
              type="button"
            >
              Все кроссовки
            </button>
            {categories.map((category) => (
              <button
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-emerald-400 hover:text-zinc-950 ${
                  activeCategory === category
                    ? "text-emerald-300"
                    : "text-zinc-300"
                }`}
                key={category}
                onClick={() => chooseCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <Link
          className="rounded-md px-3 py-2 text-sm font-bold text-zinc-300 transition hover:bg-zinc-800 hover:text-emerald-300"
          to="/checkout"
        >
          Оформление
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="currency">
          Валюта
        </label>
        <select
          className="h-10 rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm font-bold text-zinc-200 outline-none transition hover:border-emerald-400/60 focus:border-emerald-400"
          id="currency"
          onChange={(event) => setCurrency(event.target.value as Currency)}
          value={currency}
        >
          {(Object.keys(currencies) as Currency[]).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {currencies[currencyCode].label}
            </option>
          ))}
        </select>

        <a
          className="flex h-10 items-center gap-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 text-sm font-semibold text-emerald-300"
          href="/#cart"
        >
          <ShoppingCart size={18} />
          <span>{totalItems}</span>
        </a>
      </div>
    </header>
  );
}
