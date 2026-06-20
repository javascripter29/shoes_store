import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { formatPrice } from "../logic/formatPrice";
import type { Currency, Product } from "../types/shop";

export function ProductDetailsModal({
  addToCart,
  currency,
  onClose,
  product,
}: {
  addToCart: (product: Product) => void;
  currency: Currency;
  onClose: () => void;
  product: Product;
}) {
  const oldPrice = Math.ceil(product.price / 0.7 / 10) * 10;
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [zoomPixels, setZoomPixels] = useState({
    height: 0,
    x: 0,
    y: 0,
    width: 0,
  });
  const [isZooming, setIsZooming] = useState(false);
  const lensSize = 100;
  const zoomScale = 2.8;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const updateZoomPosition = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const x = (pointerX / bounds.width) * 100;
    const y = (pointerY / bounds.height) * 100;

    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
    setZoomPixels({
      height: bounds.height,
      width: bounds.width,
      x: pointerX,
      y: pointerY,
    });
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[200] grid items-start overflow-y-auto overflow-x-hidden bg-zinc-950/80 backdrop-blur-sm sm:place-items-center sm:p-4"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="min-h-screen w-full overflow-y-auto overflow-x-hidden bg-zinc-900 shadow-2xl shadow-black/60 sm:min-h-0 sm:max-h-[92vh] sm:max-w-[calc(100vw-2rem)] sm:rounded-lg sm:border sm:border-zinc-800 lg:max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[1fr_0.9fr]">
          <div
            className="relative h-[42vh] min-h-56 max-h-80 overflow-hidden bg-zinc-800 sm:h-96 sm:max-h-none md:h-[420px] lg:h-auto lg:min-h-[560px]"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={updateZoomPosition}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={product.image}
              alt={product.name}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 bg-no-repeat lg:block ${
                isZooming ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${product.image})`,
                backgroundPosition: `${
                  lensSize / 2 - zoomPixels.x * zoomScale
                }px ${lensSize / 2 - zoomPixels.y * zoomScale}px`,
                backgroundSize: `${zoomPixels.width * zoomScale}px ${
                  zoomPixels.height * zoomScale
                }px`,
                height: lensSize,
                left: `${zoomPosition.x}%`,
                top: `${zoomPosition.y}%`,
                width: lensSize,
              }}
            />
            <span className="absolute left-4 top-4 z-30 rounded-md bg-zinc-950/80 px-3 py-1.5 text-sm font-bold text-emerald-300 backdrop-blur">
              {product.category}
            </span>
          </div>

          <div className="min-w-0 p-4 sm:p-6 lg:p-7">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300 sm:text-sm">
                  Подробности товара
                </p>
                <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                  {product.name}
                </h2>
              </div>
              <button
                aria-label="Закрыть описание"
                className="grid size-10 shrink-0 place-items-center rounded-md border border-zinc-800 text-zinc-300 transition hover:border-emerald-400/60 hover:text-emerald-300 sm:size-12"
                onClick={onClose}
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-2xl font-black text-emerald-300 sm:text-3xl lg:text-4xl">
                {formatPrice(product.price, currency)}
              </p>
              <p className="text-sm font-semibold text-zinc-500 line-through sm:text-base">
                {formatPrice(oldPrice, currency)}
              </p>
            </div>

            <p className="mt-5 max-w-full text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
              {product.description}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
                <h3 className="font-bold text-zinc-100">Материалы</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {product.materials.map((material) => (
                    <li className="flex gap-2" key={material}>
                      <span className="mt-2 size-1.5 rounded-full bg-emerald-300" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
                <h3 className="font-bold text-zinc-100">Особенности</h3>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {product.features.map((feature) => (
                    <li className="flex gap-2" key={feature}>
                      <span className="mt-2 size-1.5 rounded-full bg-emerald-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <h3 className="font-bold text-zinc-100">Посадка и размер</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{product.fit}</p>
            </div>

            <button
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-emerald-400 px-4 py-3 font-black text-zinc-950 transition hover:bg-emerald-300"
              onClick={() => addToCart(product)}
              type="button"
            >
              <ShoppingCart size={19} />
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

