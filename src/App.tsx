import {
  ChevronDown,
  CheckCircle,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

type Category = "Бег" | "Город" | "Тренинг" | "Lifestyle" | "Баскетбол" | "Classic";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
};

type CartItem = Product & {
  quantity: number;
};

type Currency = "UAH" | "USD" | "EUR";

const currencies: Record<
  Currency,
  { label: string; locale: string; rate: number }
> = {
  UAH: { label: "UAH", locale: "uk-UA", rate: 1 },
  USD: { label: "USD", locale: "en-US", rate: 0.025 },
  EUR: { label: "EUR", locale: "de-DE", rate: 0.023 },
};

const categories: Category[] = [
  "Бег",
  "Город",
  "Тренинг",
  "Lifestyle",
  "Баскетбол",
  "Classic",
];

const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Zoom Pulse",
    price: 14990,
    category: "Бег",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Adidas Street Runner",
    price: 12990,
    category: "Город",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Puma Velocity Nitro",
    price: 11290,
    category: "Тренинг",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "New Balance 327 Carbon",
    price: 15990,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Reebok Club Motion",
    price: 8990,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Asics Gel Nightflow",
    price: 13990,
    category: "Бег",
    image:
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Jordan Max Court",
    price: 18990,
    category: "Баскетбол",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Converse Run Star Edge",
    price: 9990,
    category: "Город",
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 9,
    name: "Saucony Ride Neon",
    price: 12490,
    category: "Бег",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 10,
    name: "Under Armour Flow Trainer",
    price: 11890,
    category: "Тренинг",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 11,
    name: "Vans Old Skool Night",
    price: 8490,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 12,
    name: "Nike Dunk Urban Leaf",
    price: 16990,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=900&q=80",
  },
];

const formatPrice = (value: number, currency: Currency) =>
  new Intl.NumberFormat(currencies[currency].locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value * currencies[currency].rate);

const getSaleDeadline = () => {
  const deadline = new Date();
  const day = deadline.getDay();
  const daysUntilSunday = (7 - day) % 7;

  deadline.setDate(deadline.getDate() + daysUntilSunday);
  deadline.setHours(23, 59, 59, 999);

  if (deadline.getTime() <= Date.now()) {
    deadline.setDate(deadline.getDate() + 7);
  }

  return deadline.getTime();
};

const formatCountdown = (milliseconds: number) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}д ${hours.toString().padStart(2, "0")}ч ${minutes
    .toString()
    .padStart(2, "0")}м ${seconds.toString().padStart(2, "0")}с`;
};

function useSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => getSaleDeadline() - Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getSaleDeadline() - Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return formatCountdown(timeLeft);
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<Currency>("UAH");
  const [activeCategory, setActiveCategory] = useState<Category | "Все">("Все");

  const filteredProducts = useMemo(
    () =>
      activeCategory === "Все"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const chooseCategory = (category: Category | "Все") => {
    setActiveCategory(category);
    window.setTimeout(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-6 lg:px-8">
        <Header
          activeCategory={activeCategory}
          chooseCategory={chooseCategory}
          currency={currency}
          setCurrency={setCurrency}
          totalItems={totalItems}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                activeCategory={activeCategory}
                addToCart={addToCart}
                cart={cart}
                chooseCategory={chooseCategory}
                currency={currency}
                filteredProducts={filteredProducts}
                removeItem={removeItem}
                total={total}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} currency={currency} total={total} />}
          />
        </Routes>
      </div>
    </main>
  );
}

function Header({
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

function HomePage({
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
    </>
  );
}

function ProductCard({
  addToCart,
  currency,
  product,
}: {
  addToCart: (product: Product) => void;
  currency: Currency;
  product: Product;
}) {
  const oldPrice = Math.ceil(product.price / 0.7 / 10) * 10;

  return (
    <article className="group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-emerald-400/60">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
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
          onClick={() => addToCart(product)}
          type="button"
        >
          <ShoppingCart size={18} />
          В корзину
        </button>
      </div>
    </article>
  );
}

function CartPanel({
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

function CheckoutPage({
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

export default App;
