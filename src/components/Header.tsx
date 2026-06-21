import { ChevronDown, ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const catalogMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCatalogOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!catalogMenuRef.current?.contains(event.target as Node)) {
        setIsCatalogOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCatalogOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCatalogOpen]);

  const handleChooseCategory = (category: Category | "Все") => {
    chooseCategory(category);
    setIsCatalogOpen(false);
  };

  return (
    <header className="relative z-50 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur">
      <Link className="flex items-center gap-3" to="/">
        <div className="grid size-10 place-items-center rounded-md bg-emerald-400 text-zinc-950">
          <ShoppingBag size={22} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-lg font-black uppercase tracking-wide">NOVA KICKS</p>
          <p className="text-xs text-zinc-400">sneaker store</p>
        </div>
      </Link>

      <nav className="order-3 flex w-full items-center gap-2 sm:order-none sm:w-auto">
        <div className="relative" ref={catalogMenuRef}>
          <button
            aria-expanded={isCatalogOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-zinc-200 transition hover:bg-zinc-800 hover:text-emerald-300"
            onClick={() => setIsCatalogOpen((current) => !current)}
            type="button"
          >
            Каталог
            <ChevronDown
              className={`transition ${isCatalogOpen ? "rotate-180" : ""}`}
              size={16}
            />
          </button>
          {isCatalogOpen ? (
            <div
              className="absolute left-0 top-full z-[100] mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-lg border border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/40"
              role="menu"
            >
              <button
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition hover:bg-emerald-400 hover:text-zinc-950 ${
                  activeCategory === "Все" ? "text-emerald-300" : "text-zinc-300"
                }`}
                onClick={() => handleChooseCategory("Все")}
                role="menuitem"
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
                  onClick={() => handleChooseCategory(category)}
                  role="menuitem"
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <Link
          className="rounded-md px-3 py-2 text-sm font-bold text-zinc-300 transition hover:bg-zinc-800 hover:text-emerald-300"
          to="/about"
        >
          About
        </Link>
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
