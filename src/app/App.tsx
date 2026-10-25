import React from "react";

import "../css/app.css";
// v6: Switch yo'q, uning o'rniga Routes ishlatiladi
import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/products">ProductsPage</Link>
          </li>
          <li>
            <Link to="/orders">OrdersPage</Link>
          </li>
          <li>
            <Link to="/member-page">UserPage</Link>
          </li>
        </ul>
      </nav>

      {/* Routes: URL ga mos keladigan BITTA Route ni tanlaydi.
          v6 eng aniq moslikni o'zi topadi, shuning uchun tartib muhim emas */}
      <Routes>
        {/* v6: komponent Route ichiga bola qilib emas,
            element={...} prop sifatida beriladi */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
