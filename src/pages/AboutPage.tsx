import { BadgeCheck, MapPin, PackageCheck, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: BadgeCheck,
    title: "Оригинальные модели",
    text: "Отбираем пары у проверенных поставщиков и проверяем детали перед отправкой.",
  },
  {
    icon: PackageCheck,
    title: "Быстрая отправка",
    text: "Собираем заказ в течение дня и аккуратно упаковываем каждую коробку.",
  },
  {
    icon: ShieldCheck,
    title: "Честная поддержка",
    text: "Помогаем с размером, обменом и вопросами по уходу без лишней бюрократии.",
  },
] as const;

export function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="grid overflow-hidden rounded-lg border border-emerald-400/20 bg-zinc-900 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-72 bg-zinc-800 lg:min-h-[520px]">
          <img
            className="absolute inset-0 h-full w-full object-contain lg:object-cover"
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1300&q=80"
            alt="Команда магазина NOVA KICKS подбирает кроссовки"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-5 left-5 rounded-md border border-emerald-400/30 bg-zinc-950/80 px-4 py-3 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
              NOVA KICKS
            </p>
            <p className="mt-1 text-sm text-zinc-300">
              sneaker store since 2025
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
              Мы собираем кроссовки для города, спорта и быстрых маршрутов.
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-300 sm:text-lg">
              NOVA KICKS вырос из простой идеи: покупка новой пары должна быть
              такой же уверенной, как первый шаг в ней. Мы держим каталог
              компактным, следим за посадкой и выбираем модели, которые
              выдерживают реальный ритм дня.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-4">
              <p className="text-2xl font-black text-emerald-300">48h</p>
              <p className="mt-1 text-sm text-zinc-400">средняя отправка</p>
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-4">
              <p className="text-2xl font-black text-emerald-300">120+</p>
              <p className="mt-1 text-sm text-zinc-400">проверенных моделей</p>
            </div>
            <div className="rounded-md border border-zinc-800 bg-zinc-950/70 p-4">
              <p className="text-2xl font-black text-emerald-300">24/7</p>
              <p className="mt-1 text-sm text-zinc-400">заявки онлайн</p>
            </div>
          </div>

          <Link
            className="inline-flex w-fit items-center gap-2 rounded-md bg-emerald-400 px-5 py-3 font-bold text-zinc-950 transition hover:bg-emerald-300"
            to="/"
          >
            Перейти в каталог
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;

          return (
            <article
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-5"
              key={value.title}
            >
              <div className="grid size-11 place-items-center rounded-md bg-emerald-400/10 text-emerald-300">
                <Icon size={22} strokeWidth={2.4} />
              </div>
              <h2 className="mt-5 text-xl font-black">{value.title}</h2>
              <p className="mt-3 leading-7 text-zinc-400">{value.text}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 rounded-lg border border-zinc-800 bg-zinc-900 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Шоурум
          </p>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            Онлайн-магазин с вниманием локального sneaker-бутика.
          </h2>
        </div>
        <div className="grid gap-4 text-zinc-300 sm:grid-cols-[auto_1fr] sm:items-start">
          <div className="grid size-12 place-items-center rounded-md border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
            <MapPin size={24} strokeWidth={2.4} />
          </div>
          <p className="leading-7">
            Мы работаем онлайн, но думаем как команда из соседнего магазина:
            объясняем разницу между моделями, предупреждаем о посадке и не
            подталкиваем к покупке, если пара не подходит под задачу.
          </p>
        </div>
      </section>
    </div>
  );
}
