import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/navbar.css"; // to'g'rilangan yo'l

// Faol havola uchun klass beruvchi funksiya.
// Avval har bir NavLink da takrorlanardi, endi bir marta yozildi.
// isActive: sahifa manzili havolaga mos kelsa true bo'ladi.
const activeClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "underline" : undefined;

export function OtherNavbar() {
  // Vaqtincha: foydalanuvchi tizimga kirganmi? (keyin haqiqiy holatga ulanadi)
  const authMember = null;

  return (
    // Butun navbarni o'rab turuvchi tashqi blok (fon rasmi shu yerda)
    <div className="other-navbar">
      {/* Kontentni markazlashtiradi va kengligini cheklaydi */}
      <Container className="navbar-container">
        {/* Menyu qatori: chapda logo, o'ngda havolalar */}
        <Stack className="menu">
          {/* LOGO: bosilsa bosh sahifaga olib boradi */}
          <Box>
            <NavLink to="/">
              {/* src qo'shildi (o'z logotip yo'lingizni yozing), alt ham bor */}
              <img
                className="brand-logo"
                src="/icons/burak.svg"
                alt="Burak logo"
              />
            </NavLink>
          </Box>

          {/* HAVOLALAR bloki */}
          <Stack className="links">
            <Box className="hover-line">
              {/* end: faqat aynan "/" bo'lganda faol bo'lsin */}
              <NavLink to="/">Home</NavLink>
            </Box>

            <Box className="hover-line">
              <NavLink to="/products" className={activeClass}>
                Products
              </NavLink>
            </Box>

            {/* Orders va My Page faqat tizimga kirgan foydalanuvchiga ko'rinadi */}
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/orders" className={activeClass}>
                  Orders
                </NavLink>
              </Box>
            ) : null}

            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/member-page" className={activeClass}>
                  My Page
                </NavLink>
              </Box>
            ) : null}

            <Box className="hover-line">
              <NavLink to="/help" className={activeClass}>
                Help
              </NavLink>
            </Box>

            {/* BASKET (savat) keyinroq shu yerga qo'shiladi */}

            {/* Kirmagan bo'lsa Login tugmasi, kirgan bo'lsa avatar */}
            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src="/icons/default-user.svg"
                alt="User avatar"
                aria-haspopup="true" // bosilganda menyu ochilishini bildiradi
              />
            )}
          </Stack>
        </Stack>

        {/* Hozircha vaqtincha matn, keyin banner matni bilan almashtirasiz */}
      </Container>
    </div>
  );
}
