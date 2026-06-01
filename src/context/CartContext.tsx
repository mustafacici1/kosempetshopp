import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem, Product } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "patitek_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEY, []);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0,
    );

    return {
      items,
      isOpen,
      totalCount,
      subtotal,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (product, quantity = 1) => {
        setItems((prev) => {
          const existing = prev.find((i) => i.product.id === product.id);
          if (existing) {
            return prev.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            );
          }
          return [...prev, { product, quantity }];
        });
        setIsOpen(true);
      },
      removeItem: (productId) =>
        setItems((prev) => prev.filter((i) => i.product.id !== productId)),
      setQuantity: (productId, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.product.id !== productId)
            : prev.map((i) =>
                i.product.id === productId ? { ...i, quantity } : i,
              ),
        ),
      clearCart: () => setItems([]),
    };
  }, [items, isOpen, setItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart, CartProvider içinde kullanılmalıdır");
  return ctx;
}
