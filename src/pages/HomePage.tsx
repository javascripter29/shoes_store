import { useState } from "react";
import { CartPanel } from "../components/CartPanel";
import { ProductCard } from "../components/ProductCard";
import { ProductDetailsModal } from "../components/ProductDetailsModal";
import { categories } from "../data/products";
import { useSaleCountdown } from "../hooks/useSaleCountdown";
import type { CartItem, Category, Currency, Product } from "../types/shop";

export function HomePage({
  activeCategory,
  addToCart,
  cart,
  chooseCategory,
  currency,
  filteredProducts,
  removeItem,
  total,
  updateQuantity,
}: {
  activeCategory: Category | "Все";
  addToCart: (product: Product) => void;
  cart: CartItem[];
  chooseCategory: (category: Category | "Все") => void;
  currency: Currency;
  filteredProducts: Product[];
  removeItem: (id: number) => void;
  total: number;
  updateQuantity: (id: number, change: number) => void;
}) {
  const saleCountdown = useSaleCountdown();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section className="grid overflow-hidden rounded-lg border border-emerald-400/20 bg-zinc-900 md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
          <div className="w-fit space-y-2">
            <div className="rounded-md bg-emerald-400 px-3 py-1 text-sm font-black uppercase tracking-wide text-zinc-950">
              -30% до конца недели
            </div>
            <div className="rounded-md border border-emerald-400/30 bg-zinc-950/70 px-3 py-2 text-sm font-bold text-emerald-300">
              До конца акции: {saleCountdown}
            </div>
          </div>
          <div className="max-w-xl">
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Темные силуэты. Зеленая скорость.
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
              Подбери кроссовки для города, тренировок и быстрых маршрутов.
              Новая коллекция уже в каталоге.
            </p>
          </div>
          <a
            className="inline-flex w-fit items-center gap-2 rounded-md bg-emerald-400 px-5 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300"
            href="#catalog"
          >
            Смотреть каталог
          </a>
        </div>
        <div className="relative min-h-72 bg-zinc-800 sm:min-h-96">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80"
            alt="Кроссовки на темном фоне"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-emerald-400/10 md:bg-gradient-to-l" />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section id="catalog" className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                Каталог
              </p>
              <h2 className="text-2xl font-black sm:text-3xl">
                {activeCategory === "Все"
                  ? "Кроссовки в наличии"
                  : `Категория: ${activeCategory}`}
              </h2>
            </div>
            <span className="w-fit rounded-md border border-zinc-800 px-3 py-2 text-sm text-zinc-400">
              {filteredProducts.length} моделей
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {(["Все", ...categories] as const).map((category) => (
              <button
                className={`whitespace-nowrap rounded-md border px-3 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-emerald-400 bg-emerald-400 text-zinc-950"
                    : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-emerald-400/60"
                }`}
                key={category}
                onClick={() => chooseCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                addToCart={addToCart}
                currency={currency}
                key={product.id}
                onSelect={setSelectedProduct}
                product={product}
              />
            ))}
          </div>
        </section>

        <CartPanel
          cart={cart}
          currency={currency}
          removeItem={removeItem}
          total={total}
          updateQuantity={updateQuantity}
        />
      </div>

      {selectedProduct ? (
        <ProductDetailsModal
          addToCart={addToCart}
          currency={currency}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      ) : null}
    </>
  );
}
