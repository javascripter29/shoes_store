import { CheckCircle, CreditCard, MapPin, Truck, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../logic/formatPrice";
import type { CartItem, Currency } from "../types/shop";

export function CheckoutPage({
  cart,
  currency,
  total,
}: {
  cart: CartItem[];
  currency: Currency;
  total: number;
}) {
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (orderSuccess) {
    return (
      <section className="mx-auto max-w-2xl rounded-lg border border-emerald-400/30 bg-zinc-900 p-6 text-center sm:p-10">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <CheckCircle size={38} />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-emerald-300">
          Успешно
        </p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          Заказ успешно оформлен
        </h1>
        <p className="mx-auto mt-3 max-w-md text-zinc-400">
          Это демонстрационная заглушка. Мы приняли заказ и уже собираем пару
          для быстрой доставки.
        </p>
        <Link
          className="mt-7 inline-flex items-center justify-center rounded-md bg-emerald-400 px-5 py-3 font-black text-zinc-950 transition hover:bg-emerald-300"
          to="/"
        >
          Вернуться на главную
        </Link>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5 sm:p-7">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Оформление заказа
          </p>
          <h1 className="text-3xl font-black sm:text-4xl">
            Данные для доставки
          </h1>
        </div>

        <form className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
                <User size={16} />
                Имя
              </span>
              <input
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-50 outline-none transition focus:border-emerald-400"
                placeholder="Алексей"
                type="text"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-zinc-300">
                Телефон
              </span>
              <input
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-50 outline-none transition focus:border-emerald-400"
                placeholder="+7 999 000-00-00"
                type="tel"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
              <MapPin size={16} />
              Адрес доставки
            </span>
            <input
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-50 outline-none transition focus:border-emerald-400"
              placeholder="Город, улица, дом, квартира"
              type="text"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rounded-lg border border-emerald-400/60 bg-zinc-950 p-4">
              <span className="flex items-center gap-2 font-bold text-zinc-100">
                <Truck size={18} className="text-emerald-300" />
                Курьер
              </span>
              <input
                className="mt-4 accent-emerald-400"
                defaultChecked
                name="delivery"
                type="radio"
              />
            </label>
            <label className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <span className="flex items-center gap-2 font-bold text-zinc-100">
                <MapPin size={18} className="text-emerald-300" />
                Самовывоз
              </span>
              <input
                className="mt-4 accent-emerald-400"
                name="delivery"
                type="radio"
              />
            </label>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <span className="flex items-center gap-2 font-bold text-zinc-100">
              <CreditCard size={18} className="text-emerald-300" />
              Оплата картой
            </span>
            <p className="mt-2 text-sm text-zinc-400">
              Способ оплаты выбран по умолчанию для демо-заказа.
            </p>
          </div>

          <button
            className="mt-2 rounded-md bg-emerald-400 px-5 py-3 font-black text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
            disabled={cart.length === 0}
            onClick={() => setOrderSuccess(true)}
            type="button"
          >
            Подтвердить заказ
          </button>
          <Link
            className="text-center text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
            to="/"
          >
            Вернуться на главную
          </Link>
        </form>
      </div>

      <aside className="h-fit rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">Состав заказа</h2>
          <Link className="text-sm font-semibold text-emerald-300" to="/#cart">
            Изменить
          </Link>
        </div>
        {cart.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-zinc-400">
            Добавьте товары перед оформлением
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div className="flex gap-3 rounded-lg bg-zinc-950 p-3" key={item.id}>
                <img
                  className="size-16 rounded-md object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-5">{item.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {item.quantity} x {formatPrice(item.price, currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-5 border-t border-zinc-800 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-300">Итого</span>
            <span className="text-2xl font-black text-emerald-300">
              {formatPrice(total, currency)}
            </span>
          </div>
        </div>
      </aside>
    </section>
  );
}


