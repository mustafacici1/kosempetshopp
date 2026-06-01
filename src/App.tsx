import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { OrdersProvider } from "./context/OrdersContext";
import { SplashScreen } from "./components/splash/SplashScreen";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ProductsProvider>
      <OrdersProvider>
        <CartProvider>
          {loading && <SplashScreen onDone={() => setLoading(false)} />}
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="magaza" element={<ShopPage />} />
              <Route path="urun/:id" element={<ProductDetailPage />} />
              <Route path="sepet" element={<CartPage />} />
              <Route path="hizmetler" element={<ServicesPage />} />
              <Route path="hakkimizda" element={<AboutPage />} />
              <Route path="iletisim" element={<ContactPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </OrdersProvider>
    </ProductsProvider>
  );
}
