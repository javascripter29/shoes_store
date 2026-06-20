import type { Category, Product } from "../types/shop";

export const categories: Category[] = [
  "Бег",
  "Город",
  "Тренинг",
  "Lifestyle",
  "Баскетбол",
  "Classic",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Zoom Pulse",
    price: 14990,
    category: "Бег",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Легкая беговая пара для быстрых тренировок и ежедневных маршрутов по асфальту.",
    materials: ["дышащий текстиль", "синтетические накладки", "резиновая подошва"],
    features: ["упругая амортизация", "цепкий протектор", "усиленная пятка"],
    fit: "Размер в размер, средняя полнота.",
  },
  {
    id: 2,
    name: "Adidas Street Runner",
    price: 12990,
    category: "Город",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
    description:
      "Городские кроссовки с мягкой посадкой для долгих прогулок и повседневных образов.",
    materials: ["текстильная сетка", "эко-кожа", "EVA-пена"],
    features: ["мягкий воротник", "съемная стелька", "стабильная подошва"],
    fit: "Комфортная посадка, подойдет для стандартной стопы.",
  },
  {
    id: 3,
    name: "Puma Velocity Nitro",
    price: 11290,
    category: "Тренинг",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80",
    description:
      "Тренировочная модель для зала и коротких пробежек с хорошей боковой поддержкой.",
    materials: ["плотная сетка", "TPU-элементы", "резина высокой износостойкости"],
    features: ["боковая фиксация", "легкая пена", "гибкая передняя часть"],
    fit: "Плотная спортивная посадка.",
  },
  {
    id: 4,
    name: "New Balance 327 Carbon",
    price: 15990,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=80",
    description:
      "Lifestyle-силуэт с ретро-линиями и выразительной подошвой для города.",
    materials: ["замша", "нейлон", "резиновый рант"],
    features: ["ретро-профиль", "широкая подошва", "мягкая внутренняя отделка"],
    fit: "Свободная посадка, можно брать обычный размер.",
  },
  {
    id: 5,
    name: "Reebok Club Motion",
    price: 8990,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
    description:
      "Минималистичная классика для спокойных образов, офиса и выходных.",
    materials: ["натуральная кожа", "текстильная подкладка", "резиновая подошва"],
    features: ["низкий профиль", "мягкая стелька", "простая чистка"],
    fit: "Размер в размер, мягкая фиксация.",
  },
  {
    id: 6,
    name: "Asics Gel Nightflow",
    price: 13990,
    category: "Бег",
    image:
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=900&q=80",
    description:
      "Беговая пара с плавным перекатом и амортизацией для вечерних тренировок.",
    materials: ["инженерная сетка", "гелевые вставки", "AHAR-резина"],
    features: ["плавный перекат", "светоотражающие детали", "устойчивая пятка"],
    fit: "Анатомичная посадка, средняя полнота.",
  },
  {
    id: 7,
    name: "Jordan Max Court",
    price: 18990,
    category: "Баскетбол",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    description:
      "Высокие кроссовки для площадки и уличного стиля с уверенной фиксацией голеностопа.",
    materials: ["кожа", "синтетический нубук", "плотная резина"],
    features: ["высокий воротник", "амортизация пятки", "цепление для паркета"],
    fit: "Плотная посадка, для широкой стопы лучше взять на полразмера больше.",
  },
  {
    id: 8,
    name: "Converse Run Star Edge",
    price: 9990,
    category: "Город",
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80",
    description:
      "Яркий городской силуэт на массивной подошве для повседневных комплектов.",
    materials: ["хлопковый канвас", "резиновый носок", "рифленая подошва"],
    features: ["высокая платформа", "усиленный мыс", "классическая шнуровка"],
    fit: "Немного большемерит, при сомнении выбирайте меньший размер.",
  },
  {
    id: 9,
    name: "Saucony Ride Neon",
    price: 12490,
    category: "Бег",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
    description:
      "Универсальная беговая модель с ярким акцентом для темповых и легких пробежек.",
    materials: ["воздушная сетка", "формованная пена", "карбоновая резина"],
    features: ["нейтральная поддержка", "легкий верх", "хороший возврат энергии"],
    fit: "Размер в размер, мягкое прилегание в носке.",
  },
  {
    id: 10,
    name: "Under Armour Flow Trainer",
    price: 11890,
    category: "Тренинг",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",
    description:
      "Кросс-тренинговая пара для силовых занятий, интервальных тренировок и активного дня.",
    materials: ["трикотажный верх", "синтетический каркас", "Flow-подошва"],
    features: ["стабильная база", "легкий вес", "быстрая фиксация"],
    fit: "Плотная фиксация, подходит для тренировок с резкими движениями.",
  },
  {
    id: 11,
    name: "Vans Old Skool Night",
    price: 8490,
    category: "Classic",
    image:
      "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?auto=format&fit=crop&w=900&q=80",
    description:
      "Классические кеды в темном исполнении для скейт-стиля и повседневной носки.",
    materials: ["замша", "канвас", "вафельная резина"],
    features: ["укрепленный носок", "мягкий язычок", "плоская подошва"],
    fit: "Размер в размер, посадка ближе к узкой.",
  },
  {
    id: 12,
    name: "Nike Dunk Urban Leaf",
    price: 16990,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=900&q=80",
    description:
      "Акцентная lifestyle-пара с плотной конструкцией и выразительным цветовым блоком.",
    materials: ["кожа", "текстильная подкладка", "резиновая чашка подошвы"],
    features: ["стабильная посадка", "перфорированный носок", "износостойкий верх"],
    fit: "Классическая посадка Dunk, размер в размер.",
  },
];
