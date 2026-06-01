import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Order } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void;
  clearOrders: () => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

const STORAGE_KEY = "patitek_orders_v1";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useLocalStorage<Order[]>(STORAGE_KEY, []);

  const value = useMemo<OrdersContextValue>(() => {
    return {
      orders,
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
        };
        setOrders((prev) => [newOrder, ...prev]);
      },
      clearOrders: () => setOrders([]),
    };
  }, [orders, setOrders]);

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders, OrdersProvider içinde kullanılmalıdır");
  return ctx;
}
