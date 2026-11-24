# Burak React Loyihasi — To'liq Kod va Arxitektura Qo'llanmasi

Ushbu qo'llanmada **`burak-react`** loyihasining barcha asosiy qismlari, har bir fayl va kod qanday vazifani bajarishi, qanday ishlash mantig'iga ega ekanligi sodda, tushunarli va qisqa tilda bayon etilgan.

---

## 1. Loyiha umumiy tuzilishi va texnologiyalar

- **React 18 & TypeScript**: Foydalanuvchi interfeysi (UI) va qat'iy turlar xavfsizligi.
- **Redux Toolkit**: Ilovaning global holatlarini (taomlar, restoran ma'lumotlari, userlar) markazlashgan holda boshqarish.
- **React Context API (`ContextProvider`)**: Kirgan foydalanuvchi ma'lumotlarini (`authMember`) butun komponentlar bo'ylab yetkazib berish.
- **Custom Hook'lar (`useBasket`, `useGlobals`)**: Savatcha amallari va global ma'lumotlarni oson boshqarish.
- **Material-UI (MUI) & Joy UI**: Chiroyli va qulay tayyor UI komponentlar (kartalar, modal, menyu, slayderlar).
- **Axios**: Backend server (`http://localhost:3003`) bilan ma'lumot almashish (HTTP so'rovlar).

---

## 2. Kirish nuqtasi va Marshrutlash (Routing)

### `src/index.tsx`
- **Vazifasi**: Loyihaning boshlanish nuqtasi.
- **Qiladigan ishi**: HTML dagi `<div id="root"></div>` konteynerini topadi va butun ilovani quyidagi qatlamlar bilan o'rab ekranga chizadi:
  1. `<Provider store={store}>` — Redux do'konini ulaydi.
  2. `<ContextProvider>` — Foydalanuvchi ma'lumotlari kontekstini ulaydi.
  3. `<ThemeProvider theme={theme}>` — MUI stil mavzusini yuklaydi.
  4. `<CssBaseline />` — Brauzerlar orasidagi CSS nomutanosibliklarini normallashtiradi.
  5. `<Router>` — Brauzer marshrutlashini (URL orqali sahifalarni ochish) yoqadi.
  6. `<App />` — Asosiy dasturni ishga tushiradi.

### `src/app/App.tsx`
- **Vazifasi**: Ilovaning boshqaruv markazi va router strukturasi.
- **Qiladigan ishi**:
  - `useLocation()` orqali hozir foydalanuvchi qaysi sahifada ekanini tekshiradi: agar bosh sahifada (`/`) bo'lsa **`HomeNavbar`** (katta banner bilan), boshqa sahifalarda bo'lsa **`OtherNavbar`** ni ko'rsatadi.
  - `useBasket()` hook'i orqali savatchadagi mahsulotlarni va savatcha funksiyalarini (`onAdd`, `onRemove`, `onDelete`, `onDeleteAll`) qabul qilib oladi va Navbar/ProductsPage'ga uzatadi.
  - `<Switch>` va `<Route>` orqali sahifalarni URL bo'yicha bog'laydi:
    - `/` → `HomePage`
    - `/products` → `ProductsPage`
    - `/orders` → `OrdersPage`
    - `/member-page` → `UserPage`
    - `/help` → `HelpPage`
  - Sahifaning quyi qismida doimiy **`Footer`** va login/signup uchun **`AuthenticationModal`** ni chiqaradi.

---

## 3. Global holatlar (State Management)

### A. Redux Store (`src/app/store.ts`)
- **Vazifasi**: Markaziy ma'lumotlar ombori.
- **Qiladigan ishi**:
  - `homePage` (bosh sahifadagi taomlar va userlar) va `productsPage` (mahsulotlar sahifasidagi filtrlar va tanlangan taom) reducerlarini birlashtiradi.
  - `reduxLogger` middleware'i yordamida o'zgarishlarni brauzer konsolida ko'rsatib boradi.

### B. Global Context (`src/app/context/ContextProvider.tsx`)
- **Vazifasi**: Login qilgan a'zo (`authMember`) ma'lumotlarini saqlash.
- **Qiladigan ishi**:
  - Brauzer cookie'sida `accessToken` bor-yo'qligini tekshiradi. Agar token yo'q bo'lsa, `localStorage`dagi eski user ma'lumotlarini tozalaydi.
  - `authMember` va `setAuthMember` qiymatlarini butun dasturga tarqatadi.
  - Boshqa komponentlar `useGlobals()` hook'i orqali bu ma'lumotlarni oson o'qiydi yoki o'zgartiradi.

### C. Savatcha Hook'i (`src/app/hooks/useBasket.ts`)
- **Vazifasi**: Foydalanuvchining savatidagi mahsulotlarni boshqarish.
- **Qiladigan ishi**:
  - `localStorage`dagi `"cartData"` kalitidan saqlangan savat ma'lumotlarini yuklaydi.
  - `onAdd`: Mahsulot allaqachon savatda bo'lsa, sonini `quantity + 1` qiladi, bo'lmasa yangi qilib qo'shadi.
  - `onRemove`: Mahsulot sonini 1 taga kamaytiradi; agar 1 ta bo'lsa, butunlay o'chiradi.
  - `onDelete`: Muayyan mahsulotni savatdan butunlay olib tashlaydi.
  - `onDeleteAll`: Savatni butunlay tozalaydi.
  - Har bir o'zgarish avtomatik `localStorage`ga sinxronlanadi.

---

## 4. API Servislari (`src/app/services/`)

### `MemberService.ts`
Backendning `/member` endpointlari bilan muloqot qiladi:
1. `getTopUsers()`: Eng faol mijozlarni yuklash (`/member/top-users`).
2. `getRestaurant()`: Restoran/admin ma'lumotlarini olish (`/member/restaurant`).
3. `signup(input)`: Yangi user yaratish (`/member/signup`). Cookie tokenni saqlaydi va userni `localStorage`ga yozadi.
4. `login(input)`: Tizimga kirish (`/member/login`).
5. `logout()`: Tizimdan chiqish (`/member/logout`). Cookie tokenni va `localStorage`dagi user ma'lumotini o'chiradi.

### `ProductService.ts`
Backendning `/product` endpointlari bilan muloqot qiladi:
1. `getProducts(input)`: Filtrlangan (tartib, sahifa, toifa, qidiruv matni) taomlar ro'yxatini yuklash (`/product/all?...`).
2. `getProduct(productId)`: Bitta taomning to'liq ma'lumotlarini olish (`/product/:id`) va ko'rishlar sonini oshirish.

---

## 5. Asosiy Komponentlar (`src/app/components/`)

### `headers/HomeNavbar.tsx` & `OtherNavbar.tsx`
- **Vazifasi**: Saytning yuqori navigatsiya paneli.
- **Qiladigan ishi**:
  - Logotip, sahifalar menyusi (`Home`, `Products`, `Orders`, `My Page`, `Help`), savatcha tugmasi va login/profil avatarini ko'rsatadi.
  - `HomeNavbar` qo'shimcha ravishda katta qahramonlik banneri (Hero banner: "World's Most Delicious Cousine") ga ega.
  - Profil bosilganda Logout menyusini chiqaradi.

### `headers/Basket.tsx`
- **Vazifasi**: Savatcha menyusi (dropdown popover).
- **Qiladigan ishi**:
  - Savatdagi taomlar rasmi, nomi, soni va narxini ko'rsatadi.
  - Har bir taom sonini `+` va `-` tugmalari bilan oshirish/kamaytirish, yoki butunlay o'chirish imkonini beradi.
  - Umumiy narx va yetkazib berish haqqini ($100 dan kam bo'lsa $5) hisoblab ko'rsatadi.

### `auth/index.tsx` (`AuthenticationModal`)
- **Vazifasi**: Kirish (Login) va Ro'yxatdan o'tish (Signup) modal oynasi.
- **Qiladigan ishi**:
  - Foydalanuvchi ma'lumotlarini (nickname, telefon, parol) qabul qiladi.
  - Validatsiyadan o'tkazib, `MemberService` orqali serverga yuboradi.
  - Muvaffaqiyatli bo'lsa xabar (`sweetAlert`) chiqarib, `setAuthMember` orqali userni saqlaydi va modalni yopadi.

### `footer/index.tsx`
- **Vazifasi**: Sahifaning pastki qismi.
- **Qiladigan ishi**: Restoran tavsifi, ijtimoiy tarmoqlar havolalari, sayt bo'limlari va aloqa ma'lumotlarini (manzil, telefon, email) ko'rsatadi.

---

## 6. Sahifalar (Screens)

### 1. `homePage/` (Bosh sahifa)
- `index.tsx`: Bosh sahifa yuklanganda `ProductService` va `MemberService` orqali Mashhur taomlar, Yangi taomlar va Top userlarni tortib olib, Redux Store'ga yozadi.
- `Statistics.tsx`: Restoran statistikasi (filiallar, tajriba, menyular soni).
- `PopularDishes.tsx`: Eng ko'p ko'rilgan 4 ta taom kartalari.
- `NewDishes.tsx`: Yangi qo'shilgan taomlar va ularning porsiyasi/hajmi.
- `ActiveUsers.tsx`: Faol foydalanuvchilarning fotosuratlari va niklari.
- `Events.tsx`: Tadbirlar va master-klasslar slayderi (Swiper).
- `Advertisement.tsx`: Video yoki banner reklama bloki.

### 2. `productsPage/` (Mahsulotlar sahifasi)
- `index.tsx`: Ichki routing (`/products` va `/products/:productId`).
- `Products.tsx`: 
  - Toifalar (DISH, DRINK, DESSERT, SALAD va h.k.) bo'yicha filtrlash.
  - Saralash (New, Price, Views).
  - Qidiruv qatori (Search text).
  - Paginatsiya (Pagination — sahifalab ko'rsatish).
  - Har bir taom kartasidagi ko'z ikonkasi yoki bosilganda `ChosenProduct` sahifasiga yo'naltiradi.
- `ChosenProduct.tsx`:
  - Tanlangan taomning ko'p rasmli galereyasi (Swiper Thumbs).
  - Narxi, tavsifi, tayyorlagan restoran ma'lumotlari.
  - Savatchaga qo'shish ("Add to Cart") tugmasi.

### 3. `ordersPage/` (Buyurtmalar sahifasi)
- `index.tsx`: Buyurtma holatlari tablari (Paused, Process, Finished) va o'ng tomonda to'lov kartasi shakli (karta raqami, muddat, CVV).
- `PausedOrder.tsx`: Kutilayotgan (to'lanmagan yoki tasdiqlanmagan) buyurtmalar.
- `ProcessOrder.tsx`: Jarayondagi (tayyorlanayotgan) buyurtmalar.
- `FinishedOrder.tsx`: Yetkazib berilgan va yakunlangan buyurtmalar tarixi.

### 4. `userPage/` (Shaxsiy kabinet)
- `index.tsx`: Foydalanuvchining shaxsiy ma'lumotlari kartasi.
- `Settings.tsx`: Profil rasmini yuklash, ism, telefon, manzil va qisqacha tavsifni o'zgartirish maydonlari.

### 5. `helpPage/` (Yordam sahifasi)
- `index.tsx`: Qoidalar (Terms), Ko'p beriladigan savollar (FAQ - akkordeon menyu) va Adminga xabar yuborish (Contact) shakli.

---

Ushbu loyiha zamonaviy React arxitekturasi talablariga to'liq javob beradi: har bir qism (UI, State, Services, Routing) o'z javobgarlik sohasiga ega va toza kod tamoyillariga asoslangan.
