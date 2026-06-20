import { ShoppingCart } from "lucide-react";
import { formatPrice } from "../logic/formatPrice";
import type { Currency, Product } from "../types/shop";

export function ProductCard({
  addToCart,
  currency,
  onSelect,
  product,
}: {
  addToCart: (product: Product) => void;
  currency: Currency;
  onSelect: (product: Product) => void;
  product: Product;
}) {
  const oldPrice = Math.ceil(product.price / 0.7 / 10) * 10;

  return (
    <article
      className="group min-w-0 cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-emerald-400/60"
      onClick={() => onSelect(product)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(product);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-zinc-800 sm:aspect-[4/3]">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.name}
        />
        <span className="absolute left-3 top-3 rounded-md bg-zinc-950/80 px-2.5 py-1 text-xs font-bold text-emerald-300 backdrop-blur">
          {product.category}
        </span>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <h3 className="min-h-12 text-lg font-bold leading-6">
            {product.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-2xl font-black text-emerald-300">
              {formatPrice(product.price, currency)}
            </p>
            <p className="text-sm font-semibold text-zinc-500 line-through">
              {formatPrice(oldPrice, currency)}
            </p>
          </div>
        </div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-400 px-4 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300"
          onClick={(event) => {
            event.stopPropagation();
            addToCart(product);
          }}
          type="button"
        >
          <ShoppingCart size={18} />
          В корзину
        </button>
      </div>
    </article>
  );
}

