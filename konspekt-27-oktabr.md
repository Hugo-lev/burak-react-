# Burak React: 27-oktabr commitlari konspekti

Repo: `Hugo-lev/burak-react-`, branch `develop`.
Bugun 5 ta commit bo'lgan. Ulardan **10 ta fayl yangi qo'shilgan**. Quyida ularning hammasi noldan, bo'lak-bo'lak tushuntirilgan.

| Commit | Vaqt | Nima qilingan | Yangi fayllar |
|---|---|---|---|
| `a30c2cb` | 18:16 | OtherNavbar tayyorlandi | yo'q (faqat o'zgartirish) |
| `d07651a` | 18:54 | Bosh sahifa bo'limlari tashkil qilindi | `Basket.tsx`, `ActiveUsers.tsx`, `Advertisement.tsx`, `Events.tsx`, `NewDishes.tsx`, `PopularDishes.tsx`, `Statistics.tsx`, `footer.css`, `home.css` |
| `38a5509` | 19:15 | Statistics o'zgartirildi | `components/divider/index.tsx` |
| `df78edb` | 20:28 | PopularDishes tuzatildi | yo'q (faqat o'zgartirish) |
| `fb66a4b` | 20:30 | Task tugadi | yo'q (`train.ts` o'zgardi) |

## Mundarija

1. `homePage/index.tsx` (yig'uvchi fayl)
2. Vaqtincha komponentlar: `Advertisement`, `Events`, `NewDishes`, `ActiveUsers`
3. `Statistics.tsx`
4. `PopularDishes.tsx`
5. `Basket.tsx`
6. `divider/index.tsx`
7. `home.css`
8. `footer.css`
9. Muhim eslatmalar (xatolar va tuzatishlar)
10. Qisqa xulosa

---

## 1) `src/app/screens/homePage/index.tsx`: yig'uvchi fayl

Bu fayl yangi emas, lekin qolgan 6 ta komponentni bir joyga yig'adi. Shuning uchun avval shuni tushunish kerak.

```tsx
import React from "react";
// Har bir bo'lim ALOHIDA faylda yozilgan, bu yerda faqat chaqiriladi
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Statistics from "./Statistics";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
// CSS faylni ulash. Bu qator bo'lmasa, home.css umuman ishlamaydi
import "../../../css/home.css";

export default function HomePage() {
  return (
    // className="homepage": home.css dagi hamma ".homepage ..." qoidalari
    // aynan shu div ICHIDA ishlaydi
    <div className="homepage">
      {/* Tartib MUHIM: qaysi biri yuqorida yozilsa, sahifada ham yuqorida chiqadi.
          React yuqoridan pastga qarab chizadi */}
      <Statistics />
      <PopularDishes />

      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
```

**Asosiy g'oya:** sahifa bitta katta fayl emas, kichik komponentlardan yig'iladi. Har bir komponent o'z ishini qiladi, `HomePage` esa faqat tartibini belgilaydi.

**`../../../css/home.css` yo'li nima?** `..` = bir papka yuqoriga. Fayl `src/app/screens/homePage/` ichida turibdi:
`homePage` -> `screens` -> `app` -> `src`, ya'ni 3 marta yuqoriga chiqamiz, keyin `css/home.css` ga kiramiz.

---

## 2) Vaqtincha komponentlar (placeholder)

Bular hozircha bo'sh "joy ushlagichlar". Dizayni keyin qo'shiladi.

### `Advertisement.tsx` va `Events.tsx` (eng oddiy ko'rinish)

```tsx
import React from "react";

// "export default" = bu fayldan tashqariga aynan shu komponent chiqadi.
// Boshqa fayl "import Events from './Events'" deb oladi.
export default function Events() {
  // Komponent = JSX (HTML'ga o'xshash yozuv) qaytaradigan funksiya.
  // Komponent nomi har doim KATTA harf bilan boshlanadi.
  return <div>Events</div>;
}
```

### `NewDishes.tsx` va `ActiveUsers.tsx` (Container bilan)

```tsx
import React from "react";
import { Container } from "@mui/material";

export default function NewDishes() {
  return (
    <div>
      {/* Container: MUI'ning "markazlashtiruvchi qutisi".
          Kontent ekranning butun eniga yoyilmay, o'rtada, maksimal eni
          cheklangan holda turadi (theme'da "lg" uchun 1300px berilgan) */}
      <Container>NewDishes</Container>
    </div>
  );
}
```

**Farqi:** `Advertisement` va `Events` `Container`siz (to'liq enli). `NewDishes` va `ActiveUsers` `Container` bilan (o'rtada).

---

## 3) `Statistics.tsx`: to'q kulrang statistika bloki

```tsx
import React from "react";
// Box     = oddiy <div>, lekin MUI'ning "sx" prop'ini tushunadi
// Stack   = ichidagi elementlarni bir qatorga (yoki ustunga) tizadigan quti
// Divider = ajratuvchi chiziq
import { Box, Container, Divider, Stack } from "@mui/material";

export default function Statistics() {
  return (
    // .static-frame: to'q kulrang fon, balandligi 236px (home.css beradi)
    <div className="static-frame">
      <Container>
        {/* .info: 4 ta statistikani yonma-yon joylaydi (CSS: flex-direction: row) */}
        <Stack className="info">
          {/* 1-statistika */}
          <Stack className="static-box">
            <Box className="static-num">12</Box>           {/* katta raqam */}
            <Box className="static-text">Restaurants</Box> {/* ostidagi yozuv */}
          </Stack>

          {/* Vertikal ajratuvchi chiziq: balandligi 64px, eni 2px, oltin rang.
              sx = MUI komponentiga to'g'ridan-to'g'ri CSS yozish usuli.
              bgcolor = background-color ning qisqasi */}
          <Divider sx={{ height: 64, width: 2, bgcolor: "#E3C08D" }} />

          {/* 2-statistika */}
          <Stack className="static-box">
            <Box className="static-num">8</Box>
            <Box className="static-text">Experience</Box>
          </Stack>
          <Divider sx={{ height: 64, width: 2, bgcolor: "#E3C08D" }} />

          {/* 3-statistika */}
          <Stack className="static-box">
            <Box className="static-num">50+</Box>
            <Box className="static-text">Menu</Box>
          </Stack>
          <Divider sx={{ height: 64, width: 2, bgcolor: "#E3C08D" }} />

          {/* 4-statistika */}
          <Stack className="static-box">
            <Box className="static-num">200+</Box>
            <Box className="static-text">Clients</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
```

**Tuzilma sxemasi:**

```
.static-frame (to'q fon)
 └─ Container (o'rtada)
     └─ Stack.info (yonma-yon)
         ├─ Stack.static-box  (raqam + yozuv)
         ├─ Divider (chiziq)
         ├─ Stack.static-box
         ├─ Divider
         ├─ ... (jami 4 ta box, 3 ta chiziq)
```

**Kamchilik:** bir xil blok 4 marta qo'lda yozilgan. Keyinchalik `map` bilan massivdan chizish qulayroq (PopularDishes dagi usul kabi).

---

## 4) `PopularDishes.tsx`: taom kartalari

Eng murakkabi shu. Rasm, qoraytiruvchi qatlam va matn **ustma-ust uch qatlam** bo'lib turadi.

```tsx
import React from "react";
// Hammasi BITTA paketdan (@mui/material) olinadi.
// Oldin Joy UI aralashgan edi va u oppoq ekran xatosini keltirgan
import { Stack, Container, Box, Card, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility"; // ko'z ikonkasi
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"; // hujjat ikonkasi

// Vaqtincha statik ma'lumotlar. Keyin backend'dan keladi.
// Har bir element = bitta taom (nomi va rasm yo'li)
const list = [
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];
```

`/img/lavash.webp` yo'li `public/img/lavash.webp` fayliga ishora qiladi. `public` papkasi sayt ildizi hisoblanadi.

```tsx
export default function PopularDishes() {
  return (
    // CSS dagi ".popular-dishes-frame" shu div'ga tushadi (oqish fon, balandlik)
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>

          {/* .cards-frame: kartalarni yonma-yon joylaydi (CSS beradi) */}
          <Stack className="cards-frame">
            {/* map: ro'yxatdagi HAR BIR element uchun bitta <Card> chizadi.
                4 ta element bor, demak 4 ta karta chiqadi */}
            {list.map((ele) => (
              // key: React elementlarni farqlashi uchun noyob qiymat.
              // Ikkita "Kebab" bor, shuning uchun nom emas, rasm yo'li ishlatilgan
              <Card
                key={ele.imagePath}
                className="card"
                sx={{
                  position: "relative", // ichidagi "absolute" elementlar shu kartaga nisbatan turadi
                  overflow: "hidden",   // rasm kartadan chiqib ketmasin
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end", // matn kartaning PASTIDA turadi
                  borderRadius: "12px",
                }}
              >
```

### Uch qatlam (eng muhim joyi)

```tsx
                {/* 1-QATLAM (eng pastda): rasm.
                    absolute + width/height 100% = butun kartani to'ldiradi.
                    objectFit "cover" = rasm cho'zilmaydi, kesilib joylashadi.
                    component="img" = Box'ni <img> teg sifatida chizadi.
                    alt = rasm tavsifi (ko'zi ojizlar va SEO uchun kerak) */}
                <Box
                  component="img"
                  src={ele.imagePath}
                  alt={ele.productName}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* 2-QATLAM: qoraytiruvchi gradient.
                    Rangini CSS dagi ".card-cover" beradi, bu yerda faqat joylashuvi.
                    inset: 0 = top, right, bottom, left hammasi 0 (butun karta) */}
                <Box
                  className="card-cover"
                  sx={{ position: "absolute", inset: 0 }}
                />

                {/* 3-QATLAM (eng tepada): matn.
                    zIndex: 1 = rasm va gradient USTIDA turadi.
                    Aks holda matn ularning ostida qolib ko'rinmaydi */}
                <Box sx={{ position: "relative", zIndex: 1, color: "#fff" }}>
                  {/* Nom chapda, ko'rishlar soni o'ngda (space-between) */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2, // padding: 2 * 8px = 16px
                    }}
                  >
                    <Typography variant="h4" sx={{ color: "#fff" }}>
                      {ele.productName} {/* {} ichida JavaScript qiymati yoziladi */}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      20
                      <VisibilityIcon sx={{ fontSize: 25, marginLeft: "5px" }} />
                    </Box>
                  </Box>

                  {/* Pastki chiziqli qism: tavsif */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1, // ikonka va matn orasi 8px
                      px: 2,  // chap va o'ng padding
                      height: "60px",
                      borderTop: "1px solid rgba(255,255,255,0.3)", // yarim shaffof oq chiziq
                    }}
                  >
                    <DescriptionOutlinedIcon />
                    This is delicious meal
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
```

**Qatlamlar sxemasi:**

```
┌──────────────────────┐
│ 3) matn  (zIndex: 1) │  <- eng tepada
│ 2) gradient (qora)   │
│ 1) rasm              │  <- eng pastda
└──────────────────────┘
```

**`position` qoidasi:** `Card` ga `position: relative` berilgan. Ichidagi `position: absolute` elementlar sahifaga emas, aynan shu kartaga nisbatan joylashadi. Shuning uchun rasm kartaning butun maydonini to'ldiradi.

---

## 5) `headers/Basket.tsx`: savat (cart) tugmasi va ochiladigan menyu

```tsx
import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton"; // ikonkali tugma
import Badge from "@mui/material/Badge";           // ikonka ustidagi kichik raqam (3)
import Menu from "@mui/material/Menu";             // bosganda ochiladigan oyna
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Basket() {
  // STATE: menyu qaysi tugmaga "yopishib" ochilganini eslab qoladi.
  // null = menyu yopiq. HTMLElement = menyu ochiq va shu tugma yonida turadi.
  // useState qaytaradi: [hozirgi qiymat, qiymatni o'zgartiruvchi funksiya]
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Boolean(anchorEl): null bo'lsa false, element bo'lsa true.
  // Ya'ni "open" = menyu ochiqmi yoki yo'qmi
  const open = Boolean(anchorEl);

  /** HANDLERS: hodisalarni qayta ishlovchi funksiyalar **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.currentTarget = bosilgan tugmaning o'zi. Menyu shu tugma yonida ochiladi
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null); // null qilsak, open = false bo'ladi va menyu yopiladi
  };
```

```tsx
  return (
    <Box className={"hover-line"}>
      {/* Savat tugmasi */}
      <IconButton
        aria-label="cart"
        id="basic-button"
        // aria-* atributlari ekran o'quvchi (screen reader) uchun:
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick} // bosilganda menyuni ochadi
      >
        {/* Badge: ikonka ustidagi raqam. Hozircha qat'iy 3 */}
        <Badge badgeContent={3} color="secondary">
          <img src={"/icons/shopping-cart.svg"} />
        </Badge>
      </IconButton>

      {/* Menyu: anchorEl bo'lsa ochiladi */}
      <Menu
        anchorEl={anchorEl}   // qaysi elementga bog'lanishi
        id="account-menu"
        open={open}           // ochiq yoki yopiq
        onClose={handleClose} // tashqariga bosilganda yopiladi
        PaperProps={{
          elevation: 0, // standart soyani o'chirish (o'zimizniki bor)
          sx: {
            overflow: "visible", // tepadagi uchburchak chiqib turishi uchun
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))", // soya
            mt: 1.5, // tugmadan biroz pastroqda
            // "&:before": menyu tepasida kichik uchburchak (strelka) chizadi
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              // kvadratni 45 gradusga burib, rombga aylantirib, yarmini yashiradi
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        // transformOrigin: menyuning QAYSI burchagi bog'lanish nuqtasi bo'ladi
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        // anchorOrigin: tugmaning QAYSI nuqtasiga yopishadi
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
```

Menyuning ichki qismi:

```tsx
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            <div>Cart is empty!</div>
          </Box>

          {/* Bitta buyurtma qatori (hozircha statik, Kebab) */}
          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              <Box className={"basket-info-box"}>
                <div className={"cancel-btn"}>
                  <CancelIcon color={"primary"} /> {/* o'chirish (x) ikonkasi */}
                </div>
                <img src={"/img/fresh.webp"} className={"product-img"} />
                <span className={"product-name"}>Kebab</span>
                <p className={"product-price"}>$10 x 1</p>
                <Box sx={{ minWidth: 120 }}>
                  <div className="col-2">
                    <button className="remove">-</button>{" "}
                    <button className="add">+</button>
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Pastki qism: jami narx va buyurtma tugmasi */}
          <Box className={"basket-order"}>
            <span className={"price"}>Total: $100 (98 +2)</span>
            <Button startIcon={<ShoppingCartIcon />} variant={"contained"}>
              Order
            </Button>
          </Box>
        </Stack>
      </Menu>
    </Box>
  );
}
```

**Asosiy g'oya (state):** `anchorEl` ning qiymati o'zgarsa, React komponentni qayta chizadi. `null` bo'lsa menyu yopiq, element bo'lsa ochiq. Savat ichidagi hamma ma'lumot hozircha **statik** (qat'iy yozilgan). Keyin Redux va backend bilan jonli bo'ladi.

---

## 6) `components/divider/index.tsx`: o'zimiz yozgan Divider

Bu yerda MUI emas, **styled-components** kutubxonasi ishlatilgan.

```tsx
import React from 'react';
import styled from 'styled-components';

// TypeScript "interface": bu komponent qanday prop'lar qabul qilishini belgilaydi.
// "?" belgisi = ixtiyoriy (berilmasa ham bo'ladi)
export interface IDividerProps {
	width?: string;
	height?: string;
	bg?: string; // background (fon rangi)
}

// styled.span<IDividerProps>`...`: CSS yozilgan <span> komponenti yaratadi.
// ${...} ichida prop'lar qiymati CSS'ga qo'yiladi
const DividerComponent = styled.span<IDividerProps>`
	display: flex;
	min-width: ${({ width }) => `${width}px`};   /* width="2" -> 2px */
	min-height: ${({ height }) => `${height}px`}; /* height="64" -> 64px */
	background: ${({ bg }) => `${bg}`};          /* bg="#E3C08D" -> shu rang */
`;

// Bizning komponent: olgan prop'larini ({...props}) to'liq uzatadi
function Divider(props: IDividerProps) {
	return <DividerComponent {...props} />;
}

export default Divider;
```

**Ishlatilishi:** `<Divider width="2" height="64" bg="#E3C08D" />`.

**Eslatma:** hozir bu komponent **hech qayerda import qilinmagan**. `Statistics.tsx` MUI'ning o'z `Divider` ini ishlatadi. Xato emas, shunchaki hozircha ishlatilmayapti.

---

## 7) `src/css/home.css`: bosh sahifa stillari

```css
/* Hamma narsa .homepage ICHIDA. Ikki klass orasidagi BO'SH JOY = "ichida" degani */
.homepage {
  width: 100%;
  height: auto;
}

/** Statistics **/

.homepage .static-frame {
  width: 100%;
  height: 236px;
  background-color: #343434; /* to'q kulrang */
}

.homepage .static-frame .info {
  height: 100%;
  display: flex;
  flex-direction: row;            /* yonma-yon */
  justify-content: space-between; /* oraliqni teng bo'lib tashlaydi */
  align-items: center;            /* vertikal o'rtada */
}

.homepage .static-frame .static-box {
  width: 200px;
  height: 116px;
  display: flex;
  flex-direction: column; /* raqam tepada, yozuv pastda */
  align-items: center;
  justify-content: center;
}

/* Katta raqam (12, 8, 50+, 200+) */
.homepage .static-frame .static-box .static-num {
  text-align: center;
  font-family: Poppins;
  font-size: 54px;
  font-weight: 600;
  line-height: 80px;
  color: #d7b686;
}

/* Raqam ostidagi yozuv (Restaurants...) */
.homepage .static-frame .static-box .static-text {
  text-align: center;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  color: #d7b586;
}

/** Popular Dishes **/

.homepage .popular-dishes-frame {
  width: 100%;
  height: 580px; /* qat'iy balandlik: kontent kattalashsa kesilib qoladi */
  display: flex;
  background: #f8f8f8;
}

.homepage .popular-dishes-frame .popular-section {
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.homepage .popular-dishes-frame .popular-section .category-title {
  text-align: center;
  font-family: "Roboto Serif";
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 1.44px; /* harflar orasi */
  color: #000;
}

.homepage .popular-dishes-frame .popular-section .cards-frame {
  width: 100%;
  margin-top: 43px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.homepage .popular-dishes-frame .cards-frame .card {
  min-height: 430px;
  min-width: 300px;
  cursor: pointer; /* ustiga borganda "qo'l" kursori */
}

/* Rasm ustidagi qoraytiruvchi qatlam.
   Ikki gradient ustma-ust: pastki qism ko'proq qorayadi,
   shunda oq matn o'qilishi oson bo'ladi.
   "to top" = pastdan tepaga, rgba(0,0,0,0.8) = 80% qora, 0 = to'liq shaffof */
.homepage .popular-dishes-frame .cards-frame .card .card-cover {
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0) 200px),
    linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 300px);
}
```

---

## 8) `src/css/footer.css`: footer stillari

Bu qoidalar `.homepage` ga bog'liq emas, global ishlaydi.

```css
/* Footer tavsif matni */
.foot-desc-txt {
  margin-top: 22px;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 34px;
  color: #e3c08d; /* oltin rang */
}

/* Ijtimoiy tarmoq ikonkalari qatori */
.sns-context {
  margin-top: 17px;
  width: 137px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* Bo'lim sarlavhasi ("Bo'limlar", "Find us") */
.foot-category-title {
  width: 106px;
  font-family: "Poppins";
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  color: #c5c8c9;
}

/* Havolalar ustuni */
.foot-category-link {
  margin-top: 20px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 34px;
}

/* Havola (a) matni: tagidagi chiziqsiz, oltin rang */
.foot-category-link a {
  color: #e3c08d;
  text-decoration: none;
  cursor: pointer;
}

/* "Find us" qatorlari: harf (L., P., ...) va manzil yonma-yon */
.find-us {
  display: flex;
  flex-direction: row;
}
.find-us span {
  font-family: "Poppins";
  font-weight: 700;
  font-size: 18px;
  line-height: 34px;
  color: #c5c8c9;
}
.find-us div {
  margin-left: 10px;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 34px;
  color: #e3c08d;
}

.copyright-txt {
  margin-top: 17px;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 34px;
  color: #e3c08d;
}

/* ANIMATSIYA: sarlavha tagida chiziq chiqadi.
   ":after" = elementdan KEYIN ko'rinmas blok qo'shadi.
   scaleX(0) = eni nolga siqilgan (ko'rinmaydi) */
.foot-category-title:after {
  display: block;
  content: "";
  border-bottom: solid 2px #d7b686;
  transform: scaleX(0);
  transition: transform 250ms ease-in-out; /* 0.25 soniyada silliq o'zgaradi */
  transform-origin: 0% 50%; /* chapdan o'ngga qarab cho'ziladi */
}

/* Sichqoncha ustiga kelganda chiziq to'liq cho'ziladi (scaleX(1)) */
.foot-category-title:hover:after {
  transform: scaleX(1);
}
```

---

## 9) Muhim eslatmalar

**1) Basket.tsx da hali eski kod bor.** `PaperProps` yangi MUI (9.x) da olib tashlangan. Terminalda `Property 'PaperProps' does not exist` xatosi chiqadi. To'g'risi:

```tsx
// Oldin:  PaperProps={{ elevation: 0, sx: { ... } }}
// Endi:
slotProps={{ paper: { elevation: 0, sx: { /* o'sha sx */ } } }}
```

**2) `<img>` larda `alt` yo'q** (`Basket.tsx` da ikkita). Ogohlantirish chiqaradi: `alt="Shopping cart"` va `alt="Kebab"` qo'shing.

**3) Joy UI versiyasi mos emas.** `package.json` da `@mui/material` `^9.5.0`, `@mui/joy` esa `^5.0.0-beta.52`. Ular bir-biriga mos kelmaydi. Oldingi `Cannot read properties of undefined (reading 'length')` xatosining ildizi shu. `PopularDishes` hozir faqat Material ishlatadi, shuning uchun xato ketgan. Loyihada Joy kerak bo'lmasa, uni olib tashlash mumkin: `yarn remove @mui/joy`.

**4) `home.css` dagi rang farqi:** `.static-num` da `#d7b686`, `.static-text` da `#d7b586` (bir raqam farq). Ehtimol bir xil bo'lishi kerak.

**5) `PopularDishes` CSS da `height: 580px` qat'iy.** Kontent kattalashsa kesilib qoladi. `min-height: 580px` yaxshiroq.

**6) `homepage` klassi shart.** `HomePage` dagi tashqi `div` da `className="homepage"` bo'lmasa, `home.css` dagi qoidalarning hech biri ishlamaydi.

---

## 10) Qisqa xulosa

- Bosh sahifa **6 ta kichik komponentdan** yig'iladi, tartibni `homePage/index.tsx` belgilaydi.
- `Statistics` va `PopularDishes` tayyor. `NewDishes`, `Advertisement`, `ActiveUsers`, `Events` hozircha faqat nomi yozilgan placeholder.
- `PopularDishes` **3 qatlamli** karta: rasm (absolute), gradient (absolute), matn (zIndex: 1). Ma'lumot `list` massividan `map` bilan chiziladi.
- `Basket` **state** (`anchorEl`) orqali ochiladi va yopiladi. Ichidagi ma'lumot hozircha statik.
- `Divider` styled-components bilan yozilgan, lekin hozircha ishlatilmagan.
- CSS fayllar ikkiga bo'lingan: `home.css` (faqat `.homepage` ichida) va `footer.css` (global).
- Keyingi qadam: placeholder komponentlarni to'ldirish, `Basket` va `list` ni backend/Redux bilan ulash.
