import { useLayoutEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { products } from "./data/products";
import { scrollToPageTop } from "./logic/scrollToPageTop";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import type { CartItem, Category, Currency, Product } from "./types/shop";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    (document.activeElement as HTMLElement | null)?.blur();
    scrollToPageTop();

    const frame = window.requestAnimationFrame(() => {
      scrollToPageTop();
    });
    const timeout = window.setTimeout(() => {
      scrollToPageTop();
    }, 100);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
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
    <main className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Header
          activeCategory={activeCategory}
          chooseCategory={chooseCategory}
          currency={currency}
          setCurrency={setCurrency}
          totalItems={totalItems}
        />

        <ScrollToTop />

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
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        <Footer />
      </div>
    </main>
  );
}

export default App;
