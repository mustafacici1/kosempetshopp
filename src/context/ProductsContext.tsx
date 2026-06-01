import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types";
import { seedProducts } from "../data/products";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ProductsContextValue {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
  getById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

const STORAGE_KEY = "patitek_products_v1";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<Product[]>(
    STORAGE_KEY,
    seedProducts,
  );

  const value = useMemo<ProductsContextValue>(
    () => ({
      products,
      addProduct: (product) => setProducts((prev) => [product, ...prev]),
      updateProduct: (id, product) =>
        setProducts((prev) => prev.map((p) => (p.id === id ? product : p))),
      deleteProduct: (id) =>
        setProducts((prev) => prev.filter((p) => p.id !== id)),
      resetProducts: () => setProducts(seedProducts),
      getById: (id) => products.find((p) => p.id === id),
    }),
    [products, setProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx)
    throw new Error("useProducts, ProductsProvider içinde kullanılmalıdır");
  return ctx;
}
