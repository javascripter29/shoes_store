export type Category = "Бег" | "Город" | "Тренинг" | "Lifestyle" | "Баскетбол" | "Classic";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
  description: string;
  materials: string[];
  features: string[];
  fit: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Currency = "UAH" | "USD" | "EUR";
