import React from "react";

import "../css/app.css";
// v6: Switch yo'q, uning o'rniga Routes ishlatiladi
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/navbar.css";
import HelpPage from "./screens/helpPage/helpPage";
import "../css/footer.css";

function App() {
  const location = useLocation();
  console.log("location");
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      {/* Routes: URL ga mos keladigan BITTA Route ni tanlaydi.
          v6 eng aniq moslikni o'zi topadi, shuning uchun tartib muhim emas */}
      <Routes>
        {/* v6: komponent Route ichiga bola qilib emas,
            element={...} prop sifatida beriladi */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
