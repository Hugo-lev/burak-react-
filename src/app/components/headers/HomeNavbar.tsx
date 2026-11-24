import {
  Box,
  Container,
  Stack,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
// 1. HomeNavbarProps interfeysi — ota komponentdan (App.tsx) qanday ma'lumotlar (props)
// va funksiyalar kelishi shartligini belgilovchi TypeScript shartnomasi
interface HomeNavbarProps {
  // Savatcha (Cart) amallari va ma'lumotlari:
  cartItems: CartItem[]; // Savatdagi mahsulotlar ro'yxati
  onAdd: (item: CartItem) => void; // Mahsulot qo'shish yoki sonini oshirish (+1)
  onRemove: (item: CartItem) => void; // Mahsulot sonini kamaytirish (-1)
  onDelete: (item: CartItem) => void; // Muayyan mahsulotni savatdan butunlay o'chirish
  onDeleteAll: () => void; // Savatni butunlay tozalash

  // Modal oynalarni ochish/yopish boshqaruvi:
  setSignupOpen: (isOpen: boolean) => void; // Ro'yxatdan o'tish (signup) oynasini ochish
  setLoginOpen: (isOpen: boolean) => void; // Tizimga kirish (login) oynasini ochish

  // Chiqish (Logout) menyusi boshqaruvi:
  anchorEl: HTMLElement | null; // Profil menyusi qaysi tugmaga birikishini belgilovchi element
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void; // Profil bosilganda menyuni ochish
  handleCloseLogout: () => void; // Menyuni yopish
  handleLogoutRequest: () => void; // Tizimdan chiqish (logout) so'rovini yuborish
}

// 2. Bosh sahifa uchun Navbar komponenti:
// props parametri orqali yuqoridagi HomeNavbarProps turiga mos keluvchi barcha ma'lumotlarni qabul qiladi
export default function HomeNavbar(props: HomeNavbarProps) {
  // 3. Destructuring (ajratib olish): props ichidagi barcha ma'lumot va funksiyalarni
  // alohida o'zgaruvchi qilib olamiz, toki pastda "props.cartItems" emas, to'g'ridan-to'g'ri "cartItems" deb yozish mumkin bo'lsin
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    anchorEl,
    handleLogoutClick,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  // Global foydalanuvchi ma'lumoti
  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          {/* Restoran logotipi */}
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" alt="logo" />
            </NavLink>
          </Box>

          {/* Menyu havolalari (Links) */}
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/" activeClassName={"underline"}>
                Home
              </NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>
            {/* Faqat login bo'lgan a'zolarga Orders va My Page ko'rinadi */}
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/member-page" activeClassName={"underline"}>
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>

            {/* Savatcha (Basket) komponenti */}
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {/* Agar login bo'lmagan bo'lsa 'Login' tugmasi, login bo'lsa user rasmi chiqadi */}
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
                alt="user avatar"
              />
            )}

            {/* Profil bosilganda ochiladigan Logout menyusi */}
            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        {/* Bosh sahifa Hero banner qismi */}
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-txt"}>
              World's Most Delicious Cousine
            </Box>
            <Box className={"wel-txt"}>The Choice, not just a choice</Box>
            <Box className={"service-txt"}> 24/7 hours service</Box>
            <Box className={"signup"}>
              {/* User login bo'lmagan bo'lsa Ro'yxatdan o'tish (Sign up) tugmasi */}
              {!authMember ? (
                <Button
                  variant={"contained"}
                  className={"signup-button"}
                  onClick={() => setSignupOpen(true)}
                >
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className={"logo-frame"}>
            <div className={"logo-img"}></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
// 40:08
