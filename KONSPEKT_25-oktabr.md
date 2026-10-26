## 8. Bugungi ishlar (25-oktabr 2026): commitlar

| Vaqt | Commit | Nima qilindi |
|---|---|---|
| 15:06 | `feat: create routing system` | `react-router-dom` o'rnatildi, `BrowserRouter` va `Routes` ulandi |
| 15:30 | `fix: develop Burak screen based components` | Har bir sahifa uchun alohida papka va komponent yaratildi |
| 16:17 | `fix: organize header and footer components` | `HomeNavbar`, `OtherNavbar`, `Footer` komponentlari qo'shildi |
| 16:24 | `fix: upload client materials` | `index.html`, `manifest.json`, favicon va `typography.ts` yangilandi |
| 17:30 | `feat: header and footer components develop` | `HomeNavbar` to'liq yozildi, `navbar.css` qo'shildi |
| keyin | `feat: Mit Task is done` | `train.ts` ga `findIntersection` topshirig'i yozildi, `navbar.css` fon qismi o'zgardi |

**Commit nomlari qoidasi** (conventional commits):
- `feat:` yangi imkoniyat qo'shildi
- `fix:` mavjud narsa tuzatildi yoki tartibga solindi

---

## 9. Yangilangan papka tuzilmasi

```
burak-react/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── icons/              ← svg ikonlar (burak.svg, favicon.svg, ...)
│   ├── img/                ← rasmlar (banner.webp, auth.webp, ...)
│   └── video/              ← burak-ads.mp4
├── src/
│   ├── index.tsx           ← BrowserRouter shu yerda ulanadi
│   ├── css/
│   │   ├── index.css
│   │   ├── app.css
│   │   └── navbar.css      ← YANGI: navbar uslublari
│   └── app/
│       ├── App.tsx         ← sahifalarni tanlaydigan asosiy komponent
│       ├── store.ts
│       ├── MaterialTheme/
│       │   ├── index.ts    ← mavzu (theme) shu yerda yig'iladi
│       │   ├── typography.ts
│       │   ├── shadow.ts
│       │   └── styled.ts
│       ├── components/     ← YANGI: qayta ishlatiladigan bo'laklar
│       │   ├── headers/
│       │   │   ├── HomeNavbar.tsx
│       │   │   └── OtherNavbar.tsx
│       │   └── footer/index.tsx
│       └── screens/        ← YANGI: har bir sahifa alohida papkada
│           ├── homePage/index.tsx
│           ├── productsPage/index.tsx
│           ├── ordersPage/index.tsx
│           ├── userPage/index.tsx
│           └── helpPage/helpPage.tsx
└── train.ts                ← topshiriqlar (algoritmlar)
```

**Qoida:**
- `components/` sahifaning bo'lagi (navbar, footer): bir necha sahifada ishlatiladi.
- `screens/` to'liq sahifa: bitta URL manziliga to'g'ri keladi.

---

## 10. React Router v6 (sahifalar orasida yurish)

### 10.1. Nima uchun kerak?

Oddiy sayt har bir sahifa uchun serverdan yangi HTML oladi. React'da esa **bitta** sahifa bor, router esa URL ga qarab qaysi komponentni ko'rsatishni tanlaydi. Sahifa qayta yuklanmaydi, shuning uchun tez ishlaydi.

O'rnatish:

```bash
yarn add react-router-dom@6
```

### 10.2. `src/index.tsx` da ulash

```tsx
import { BrowserRouter as Router } from "react-router-dom";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Router: ichidagi hamma komponent URL ni bilib oladi */}
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
```

- `BrowserRouter` brauzer manzil satrini (`/products`, `/help`) kuzatib turadi.
- `as Router` bu qisqa nom berish (alias): `BrowserRouter` o'rniga `Router` deb yozamiz.
- `<App />` albatta `Router` **ichida** bo'lishi kerak, aks holda `useLocation` va `NavLink` xato beradi.

### 10.3. `src/app/App.tsx`

```tsx
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  // useLocation: hozirgi URL haqida ma'lumot beradi (location.pathname = "/products")
  const location = useLocation();

  return (
    <>
      {/* Bosh sahifada ("/") katta navbar, boshqa sahifalarda oddiy navbar */}
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}

      {/* Routes: URL ga mos keladigan BITTA Route ni tanlaydi */}
      <Routes>
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
```

Tushuntirish:
- `<>...</>` bu `Fragment`: qo'shimcha `div` yaratmasdan bir nechta elementni birga o'rab turadi.
- `path` bu URL manzil, `element` shu manzilda ko'rsatiladigan komponent.
- `Routes` ichidagi `Route`lardan faqat **bittasi** ko'rinadi, navbar va footer esa `Routes` tashqarisida, shuning uchun har doim ko'rinadi.
- Ichma-ich shart: `shart ? A : B`. Shart rost bo'lsa A, yolg'on bo'lsa B chiqadi (ternary operator).

### 10.4. v5 va v6 farqi

| v5 (eski) | v6 (hozirgi) |
|---|---|
| `Switch` | `Routes` |
| `<Route component={Home} />` | `<Route element={<Home />} />` |
| `exact` kerak edi | kerak emas, v6 eng aniq moslikni o'zi topadi |
| `NavLink activeClassName="x"` | `NavLink className={({ isActive }) => ...}` |

### 10.5. `Link` va `NavLink`

- `Link`: oddiy havola, sahifani yangilamaydi.
- `NavLink`: `Link` ning kengaytirilgan varianti, hozir ochiq turgan sahifani biladi (`isActive`).

```tsx
<NavLink
  to="/products"
  end                                   // faqat aynan shu manzilda "active" bo'ladi
  className={({ isActive }) =>          // isActive: true / false
    isActive ? "underline" : undefined  // active bo'lsa "underline" klassi beriladi
  }
>
  Products
</NavLink>
```

`end` bo'lmasa, `to="/"` har doim active bo'lib qoladi (chunki har qanday manzil `/` dan boshlanadi).

---

## 11. Sahifa komponentlari

Hozircha har bir sahifa oddiy sinov matni bilan:

```tsx
import { Container } from "@mui/material";

export function HelpPage() {
  return <Container>HelpPage</Container>;
}
```

- `export function` nomli eksport. Importda jingalak qavs kerak: `import { HelpPage } from "./screens/helpPage/helpPage"`.
- Komponent nomi **katta harfdan** boshlanishi shart (`HelpPage`), aks holda React uni oddiy HTML teg deb o'ylaydi.

---

## 12. `HomeNavbar.tsx` (asosiy navbar)

### 12.1. Tuzilishi

```
div.home-navbar                       ← butun fon (rasm shu yerda)
└── Container                          ← kontentni o'rtaga qisadi
    ├── Stack (row, space-between)     ← bitta qator
    │   ├── Box → logo
    │   └── Stack (row)                ← menyu
    │       ├── Home
    │       ├── Products
    │       ├── Orders   (faqat kirgan bo'lsa)
    │       ├── My Page  (faqat kirgan bo'lsa)
    │       ├── Help
    │       └── Login tugmasi / profil rasmi
    └── Stack → "DETAIL" (keyin to'ldiriladi)
```

### 12.2. MUI komponentlari

- **Container**: sahifa o'rtasida cheklangan kenglikdagi quti.
- **Stack**: bolalarini flexbox bilan tartiblaydi. `flexDirection="row"` bo'lsa qatorda, `"column"` bo'lsa ustunda.
- **Box**: oddiy `div`, lekin `sx` orqali stil berish mumkin.
- `justifyContent="space-between"`: birinchi element chapga, oxirgisi o'ngga, orasi teng bo'sh.
- `alignItems="center"`: vertikal o'rtaga.
- `sx={{ mt: "55px" }}`: `mt` = margin-top (tepadan bo'sh joy).

### 12.3. Shartli ko'rsatish (`authMember`)

```tsx
const authMember = null; // hozircha hech kim kirmagan

{authMember ? (
  <Box><NavLink to="/orders">Orders</NavLink></Box>
) : null}

{!authMember ? (
  <Box><Button variant="contained">Login</Button></Box>
) : (
  <img src="/icons/default-user.svg" alt="user" />
)}
```

- `authMember` bor (`null` emas) bo'lsa `Orders` va `My Page` ko'rinadi, `null` bo'lsa **hech narsa** chiqmaydi.
- `!authMember` degani "authMember yo'q". Bunda `Login` tugmasi chiqadi, bor bo'lsa foydalanuvchi rasmi chiqadi.
- `null` React'da "hech narsa chizma" degani.
- `variant="contained"` MUI tugmasini to'ldirilgan (rangli) qiladi.

---

## 13. `navbar.css` (chiziq animatsiyasi)

```css
.home-navbar {
  width: 100%;
  height: 773px;
  display: flex;
  background-size: cover;      /* rasm butun maydonni to'ldiradi */
  background-position: center; /* rasmning o'rtasi ko'rinadi */
}

.home-navbar a { text-decoration: none; }   /* havola tagidagi chiziqni olib tashlash */

.home-navbar .hover-line a { color: #f8f8ff; z-index: 100; }

/* hover-line ning "tagidagi" ko'rinmas chiziq */
.home-navbar .hover-line:after {
  display: block;
  content: "";                                  /* :after ishlashi uchun shart */
  border-bottom: solid 2px #d7b686;             /* oltin rang chiziq */
  transform: scaleX(0);                         /* eni 0 = ko'rinmaydi */
  transition: transform 250ms ease-in-out;      /* 0.25 soniyada silliq o'zgaradi */
}

/* sichqoncha ustiga kelganda chiziq to'liq kengayadi */
.home-navbar .hover-line:hover:after { transform: scaleX(1); }

/* chiziq chap tomondan o'sib boradi */
.home-navbar div.hover-line:after { transform-origin: 0% 50%; }

/* hozir ochiq sahifa: chiziq doim ko'rinadi */
.home-navbar .underline {
  display: block;
  border-bottom: solid 2px #d7b686;
}
```

Tushuntirish:
- `:after` bu elementdan keyin sun'iy element yaratadi. Biz undan chiziq sifatida foydalanamiz.
- `scaleX(0)` chiziqni eni bo'yicha nolgacha qisadi, `scaleX(1)` esa asl holiga qaytaradi.
- `transition` o'zgarishni sakramasdan, silliq qiladi.
- `.underline` klassini `NavLink` faqat ochiq turgan sahifaga beradi (10.5-bo'lim).

---

## 14. `public` papkasi va rasm yo'llari

### 14.1. `public/index.html` va `manifest.json`

```html
<link rel="icon" href="%PUBLIC_URL%/icons/favicon.svg" />   <!-- brauzer tabidagi belgi -->
<title>Burak</title>                                       <!-- brauzer tabidagi nom -->
```

`%PUBLIC_URL%` bu `public` papkaning manzili, CRA uni o'zi to'ldiradi.

### 14.2. Rasmga murojaat qilish qoidalari

`public` papkadagi fayl sayt ildizidan boshlanadi:

| Fayl | Yozilishi |
|---|---|
| `public/img/banner.webp` | `/img/banner.webp` |
| `public/icons/burak.svg` | `/icons/burak.svg` |

`/public/img/...` **deb yozilmaydi**.

### 14.3. CSS ichida `url("/img/...")` xatosi

CRA (webpack) CSS ichidagi `url()` ni fayl sifatida qidiradi. `/` bilan boshlangan yo'lni `src/css` ichidan topa olmaydi:

```
Module not found: Error: Can't resolve '/img/banner.webp' in '...\src\css'
```

**Yechim:** fon rasmini CSS'ga emas, TSX'dagi `style` ga yozish, chunki inline stilni webpack tekshirmaydi:

```tsx
<div
  className="home-navbar"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url('/img/banner.webp')",
  }}
>
```

- `backgroundImage` bu CSS'dagi `background-image` ning JSX yozilishi (camelCase).
- `linear-gradient(rgba(0,0,0,0.1), ...)` bu rasm ustiga qo'yilgan yarim shaffof qora qatlam. Raqam qancha katta bo'lsa, shuncha qorong'i (`0` = qatlam yo'q, `1` = butunlay qora).
- Boshqa yo'l: rasmni `src` ichiga ko'chirish va `import` qilish.

### 14.4. `background-color` va `background-image` farqi

- `background-color` faqat **rang** qabul qiladi (`red`, `#fff`).
- `background-image` **rasm** yoki gradient qabul qiladi.
- Rasmni `background-color` ga yozsak, brauzer uni jim e'tiborsiz qoldiradi, xato ham chiqmaydi. Shuning uchun xatoni topish qiyin bo'ladi.

---

## 15. MUI mavzusi (`MaterialTheme/index.ts`)

```ts
const light = {
  palette: {
    background: { default: "#f8f8ff", paper: common.white },
    primary:   { main: "#343434", contrastText: "#d7b586" },
    secondary: { main: "#d7b586", contrastText: "#343434" },
    text: { primary: "#343434", secondary: "#d7b586" },
  },
  components: {
    MuiContainer: { styleOverrides: { root: { height: "100%" } } },
  },
  typography,   // typography.ts dan keladi (h1..h6 o'lchamlari)
};

let theme = createTheme(light);
```

- `palette` ranglar to'plami, `typography` esa sarlavhalar o'lchami (`h1` = 35px, `h2` = 29px, ...).
- `components.MuiContainer.styleOverrides` MUI'ning tayyor `Container` komponentini butun loyiha bo'yicha o'zgartiradi (balandligi 100%).
- Katta ekranda (`lg`) `Container` eni 1300px bilan cheklanadi.
- MUI v5 da rejim `mode: "light"` deb yoziladi. `type: "light"` MUI v4 uchun edi.

---

## 16. Topshiriq: `findIntersection` (`train.ts`)

Ikki arrayning umumiy elementlarini topish:

```ts
// <T> = generic tur: number, string va boshqa har qanday tur bilan ishlaydi
function findIntersection<T>(arr1: T[], arr2: T[]): T[] {
  // Set = takrorlanmaydigan qiymatlar to'plami. has() juda tez qidiradi
  const set2 = new Set(arr2);

  // filter: arr1 ning har bir elementini tekshiradi,
  // faqat shart rost (true) bo'lganlarini yangi arrayga qoldiradi
  return arr1.filter((item) => set2.has(item));
}

console.log(findIntersection([1, 2, 3], [3, 2, 0])); // [2, 3]
```

Qadamma-qadam (`[1,2,3]` va `[3,2,0]`):
1. `set2` = `{3, 2, 0}`
2. `1` set2 da yo'q, tashlanadi.
3. `2` set2 da bor, qoladi.
4. `3` set2 da bor, qoladi.
5. Natija: `[2, 3]` (tartib `arr1` dagidek).

Nima uchun `Set`? Agar `arr2.includes(item)` yozsak, har bir element uchun butun `arr2` ni aylanib chiqiladi (sekin). `Set.has` esa bir zumda javob beradi, shuning uchun kod tezroq ishlaydi.

Eslatma: `arr1` da takror elementlar bo'lsa, natijada ham takror chiqadi.

Oldingi topshiriq `chunkArray` kommentga olingan (`//` bilan), chunki bir faylda ikkita sinov kodini ishlatmaslik uchun.

---

## 17. Bugun uchragan xatolar va yechimlari

| Xato | Sababi | Yechimi |
|---|---|---|
| Fon rasmi chiqmadi, `Home`, `Products` yozuvlari ko'rinmadi | `background-color: url(...)` yozilgan | `background-image` ishlatish |
| Oq yozuvlar och fonda ko'rinmaydi | Fon rasmi yuklanmagan, yozuv rangi oq | Fon chiqsa, o'zi tuzaladi |
| `Can't resolve '/img/banner.webp' in ...\src\css` | CRA CSS ichidagi `/...` yo'lni fayl deb qidiradi | Rasmni TSX'dagi inline `style` ga o'tkazish |
| `/public/img/...` yo'li ishlamadi | `public` so'zi yo'lga yozilmaydi | `/img/...` deb yozish |
| Rasm juda qorong'i | Gradient qatlami `0.6` juda kuchli | Qatlamni `0.1` gacha kamaytirish yoki olib tashlash |
| `activeClassName` ishlamadi | U faqat v5 da bor | v6 da `className={({ isActive }) => ...}` |
| Logo ko'rinmadi | `<img>` da `src` yo'q edi | `src="/icons/burak.svg"` qo'shish |
| `Home` doim active bo'lib qoldi | `end` yozilmagan | `NavLink` ga `end` qo'shish |
| `useLocation` xato beradi | `App` `Router` tashqarisida | `<Router><App /></Router>` |

---

## 18. Bugungi asosiy xulosalar

1. Router: `BrowserRouter` (index.tsx) → `Routes`/`Route` (App.tsx) → `NavLink` (menyu).
2. Katta ilovada kod `components/` (bo'laklar) va `screens/` (sahifalar) ga bo'linadi.
3. `public` ichidagi fayl yo'li `/` dan boshlanadi, `public` so'zi yozilmaydi.
4. CRA da CSS `url()` ichida `/` bilan boshlangan yo'l xato beradi, rasm uchun inline `style` yoki `src` ichida `import` ishlatiladi.
5. Shartli ko'rsatish: `shart ? <A /> : <B />` yoki `shart ? <A /> : null`.
6. Commit xabarlari `feat:` / `fix:` bilan boshlanadi va nima qilingani ravshan yoziladi.
