import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../logic/formatPrice";
import type { CartItem, Currency } from "../types/shop";

export function CartPanel({
  cart,
  currency,
  removeItem,
  total,
  updateQuantity,
}: {
  cart: CartItem[];
  currency: Currency;
  removeItem: (id: number) => void;
  total: number;
  updateQuantity: (id: number, change: number) => void;
}) {
  return (
    <aside
      id="cart"
      className="h-fit rounded-lg border border-zinc-800 bg-zinc-900 p-4 lg:sticky lg:top-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Корзина
          </p>
          <h2 className="text-2xl font-black">Ваш заказ</h2>
        </div>
        <div className="grid size-11 place-items-center rounded-md bg-zinc-950 text-emerald-300">
          <ShoppingCart size={21} />
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-zinc-400">
          Корзина пока пустая
        </div>
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              className="grid grid-cols-[64px_1fr] gap-3 rounded-lg border border-zinc-800 bg-zinc-950/60 p-3"
              key={item.id}
            >
              <img
                className="size-16 rounded-md object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="line-clamp-2 font-semibold leading-5">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-emerald-300">
                      {formatPrice(item.price, currency)}
                    </p>
                  </div>
                  <button
                    aria-label={`Удалить ${item.name}`}
                    className="rounded-md p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-300"
                    onClick={() => removeItem(item.id)}
                    type="button"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center overflow-hidden rounded-md border border-zinc-700">
                    <button
                      aria-label="Уменьшить количество"
                      className="grid size-8 place-items-center text-zinc-300 transition hover:bg-zinc-800"
                      onClick={() => updateQuantity(item.id, -1)}
                      type="button"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="grid h-8 min-w-9 place-items-center border-x border-zinc-700 text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      aria-label="Увеличить количество"
                      className="grid size-8 place-items-center text-zinc-300 transition hover:bg-zinc-800"
                      onClick={() => updateQuantity(item.id, 1)}
                      type="button"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <p className="font-bold">
                    {formatPrice(item.price * item.quantity, currency)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 border-t border-zinc-800 pt-5">
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold text-zinc-300">Итого</span>
          <span className="text-2xl font-black text-emerald-300">
            {formatPrice(total, currency)}
          </span>
        </div>
        <Link
          aria-disabled={cart.length === 0}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 font-black transition ${
            cart.length === 0
              ? "pointer-events-none bg-zinc-700 text-zinc-400"
              : "bg-emerald-400 text-zinc-950 hover:bg-emerald-300"
          }`}
          to="/checkout"
        >
          <ShoppingBag size={19} />
          Оформить заказ
        </Link>
      </div>
    </aside>
  );
}

