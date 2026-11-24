import React, { useState } from "react";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Switch, useLocation } from "react-router-dom";
// import { About } from "./screens/About";
// import { Users } from "./screens/Users";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";

import HelpPage from "./screens/helpPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/home.css";
import Test from "./screens/Test";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import { Messages } from "../lib/config";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { T } from "../lib/types/common";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

function App() {
  // Joriy sahifa URL manzilini aniqlash uchun (masalan: "/" yoki "/products")
  const location = useLocation();
  // Global kontekstdan avtorizatsiyadan o'tgan userni o'zgartirish funksiyasi
  const { setAuthMember } = useGlobals();

  // Savatcha hook'i: mahsulotlar ro'yxati, qo'shish, kamaytirish, o'chirish va tozalash
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  // Ro'yxatdan o'tish (signup) va tizimga kirish (login) modallari holati
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  // Chiqish (logout) menyusi qaysi tugmaga bog'lanishini saqlovchi element
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS (Hodisalar boshqaruvchilari) **/

  // Signup va Login modallarini yopish funksiyalari
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  // Logout menyusini ochish (profil rasmi bosilganda)
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  // Logout menyusini yopish
  const handleCloseLogout = () => setAnchorEl(null);

  // Tizimdan chiqish so'rovi (backend cookie'ni tozalaydi va localstatedan o'chiriladi)
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("Successfully logged out!", 700);
      setAuthMember(null); // Global contextdagi foydalanuvchini null qilamiz
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };

  return (
    <>
      {/* Agar bosh sahifa ("/") bo'lsa HomeNavbar, boshqa sahifalarda OtherNavbar ko'rinadi */}
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}

      {/* Sahifalar marshrutlari (Routing Switch) */}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          {/* <Test /> */}
          <HomePage />
        </Route>
      </Switch>

      {/* Saytning quyi qismi (Footer) */}
      <Footer />

      {/* Kirish / Ro'yxatdan o'tish modal oynasi */}
      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}
export default App;
