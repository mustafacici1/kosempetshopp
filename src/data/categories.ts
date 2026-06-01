import type { Category } from "../types";
import { photo } from "../lib/photos";
import kediPhoto from "../assets/kedi.jpeg";

export const categories: Category[] = [
  {
    id: "kopek",
    name: "Köpek",
    emoji: "🐕",
    description: "Mama, ödül, oyuncak ve bakım",
    color: "#e2652c",
    photo: new URL("../assets/kopek.jpg", import.meta.url).href,
  },
  {
    id: "kedi",
    name: "Kedi",
    emoji: "🐈",
    description: "Kuru/yaş mama, kum ve tırmalama",
    color: "#43756a",
    photo: kediPhoto,
  },
  {
    id: "kus",
    name: "Kuş",
    emoji: "🦜",
    description: "Yem, kafes ve vitamin takviyeleri",
    color: "#5b94b0",
    photo: photo("parrot,bird", 103, 600, 700),
  },
  {
    id: "kemirgen",
    name: "Kemirgen",
    emoji: "🐹",
    description: "Hamster, tavşan ve gine domuzu",
    color: "#e0a64a",
    photo: new URL("../assets/main_page_tavsan.jpg", import.meta.url).href,
  },
  {
    id: "balik",
    name: "Balık",
    emoji: "🐠",
    description: "Akvaryum, yem ve su düzenleyici",
    color: "#4f6dba",
    photo: photo("aquarium,fish", 105, 600, 700),
  },
  {
    id: "aksesuar",
    name: "Aksesuar",
    emoji: "🦴",
    description: "Tasma, mama kabı ve taşıma",
    color: "#b1567a",
    photo: photo("dog,leash", 106, 600, 700),
  },
];

export const getCategory = (id: string) =>
  categories.find((c) => c.id === id);
