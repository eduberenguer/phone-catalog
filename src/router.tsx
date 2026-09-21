import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PhoneList } from "./pages/PhoneList/PhoneList";
import { PhoneDetail } from "./pages/PhoneDetail/PhoneDetail";
import { Cart } from "./pages/Cart/Cart";
import { NotFound } from "./pages/NotFound/NotFound";
import { Layout } from "./components/Layout/Layout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PhoneList />} />
          <Route path="/phone/:id" element={<PhoneDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
