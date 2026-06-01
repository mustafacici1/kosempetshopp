export type CategoryId = "kopek" | "kedi" | "kus" | "kemirgen" | "balik" | "aksesuar";

export interface Category {
  id: CategoryId;
  name: string;
  emoji: string;
  description: string;
  color: string;
  photo: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  photo?: string;
  badge?: "Yeni" | "İndirim" | "Çok Satan";
  shortDescription: string;
  description: string;
  stock: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
}
