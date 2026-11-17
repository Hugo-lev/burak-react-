# 15-noyabr 2026: bugungi ish (qatorma-qator)

**Repozitoriy:** `Hugo-lev/burak-react-`, branch `develop`
**Commit:** `d8c4f05`, soat 09:35, `feat:create homepage redux`
**Hajmi:** 11 ta fayl, 263 qator qo'shilgan, 2 qator o'chirilgan

---

## 1. Bugun nima qilindi (qisqacha)

Bosh sahifa (HomePage) uchun **Redux** tizimi qurildi. Redux ilovaning "umumiy xotirasi" (store). Ish 3 bosqichda bajarildi:

```
1) Tiplar va enumlar   →  ma'lumot QANDAY SHAKLDA bo'lishini belgiladik
2) Slice + Selector    →  xotiraga yozish va xotiradan o'qish funksiyalari
3) Store + HomePage    →  hammasini ulab, komponentda ishlatdik
```

Ma'lumot oqimi:

```
Backend ──▶ (slice: yozish) ──▶ STORE ──▶ (selector: o'qish) ──▶ Komponent
```

## 2. O'zgargan fayllar

| # | Fayl | Holat |
|---|---|---|
| 1 | `src/lib/enums/member.enum.ts` | yangi |
| 2 | `src/lib/enums/order.enum.ts` | yangi |
| 3 | `src/lib/enums/product.enum.ts` | yangi |
| 4 | `src/lib/enums/view.enum.ts` | yangi |
| 5 | `src/lib/types/member.ts` | yangi |
| 6 | `src/lib/types/product.ts` | yangi |
| 7 | `src/lib/types/screen.ts` | yangi |
| 8 | `src/app/screens/homePage/slice.ts` | yangi |
| 9 | `src/app/screens/homePage/selector.ts` | yangi |
| 10 | `src/app/store.ts` | o'zgargan |
| 11 | `src/app/screens/homePage/index.tsx` | o'zgargan |

---

## 3. Qatorma-qator tushuntirish

### 3.1. Enumlar (`src/lib/enums/`)

**Enum nima?** "Faqat shu qiymatlardan biri bo'la oladi" degan ro'yxat. Shunda `"USERR"` kabi xato yozishning oldi olinadi.

#### `member.enum.ts`
```ts
export enum MemberType {          // "export" = boshqa fayllar ham ishlatishi mumkin
  USER = "USER",                  // oddiy mijoz
  RESTAURANT = "RESTAURANT",      // restoran egasi
}
export enum MemberStatus {
  ACTIVE = "ACTIVE",              // faol foydalanuvchi
  BLOCK = "BLOCK",                // bloklangan
  DELETE = "DELETE",              // o'chirilgan
}
```

#### `order.enum.ts`
```ts
export enum OrderStatus {
  PAUSE = "PAUSE",                // to'xtatilgan (savatda, to'lanmagan)
  PROCESS = "PROCESS",            // jarayonda
  FINISH = "FINISH",              // tugagan
  DELETE = "DELETE",              // o'chirilgan
}
```

#### `product.enum.ts`
```ts
export enum ProductSize {
  SMALL = "SMALL",                // kichik
  NORMAL = "NORMAL",              // oddiy
  LARGE = "LARGE",                // katta
  SET = "SET",                    // to'plam
}

export enum ProductVolume {       // hajm (litr), bu yerda qiymatlar RAQAM
  HALF = 0.5,
  ONE = 1,
  ONE_POINT_TWO = 1.2,
  ONE_POINT_FIVE = 1.5,
  TWO = 2,
}

export enum ProductStatus {
  PAUSE = "PAUSE",
  PROCESS = "PROCESS",
  DELETE = "DELETE",
}

export enum ProductCollection {   // taom turi
  DISH = "DISH",                  // asosiy taom
  SALAD = "SALAD",                // salat
  DESSERT = "DESSERT",            // shirinlik
  DRINK = "DRINK",                // ichimlik
  OTHER = "OTHER",                // boshqa
}
```

#### `view.enum.ts`
```ts
export enum ViewGroup {
  PRODUCT = "PRODUCT",            // ko'rish qaysi guruhga tegishli (hozircha faqat mahsulot)
}
```

---

### 3.2. Tiplar (`src/lib/types/`)

**Interface nima?** Obyektning "shakli": qanday maydonlar bor va ularning turi nima.
`?` belgisi: maydon **ixtiyoriy** (bo'lmasligi ham mumkin).

#### `member.ts`
```ts
import { MemberStatus, MemberType } from "../enums/member.enum"; // enumlarni olamiz

export interface Member {            // backenddan keladigan TO'LIQ foydalanuvchi
  _id: string;                       // MongoDB ID
  memberType: MemberType;            // USER yoki RESTAURANT
  memberStatus: MemberStatus;        // ACTIVE / BLOCK / DELETE
  memberNick: string;                // nik
  memberPhone: string;               // telefon
  memberPassword?: string;           // parol (ixtiyoriy)
  memberAddress?: string;            // manzil (ixtiyoriy)
  memberDesc?: string;               // tavsif (ixtiyoriy)
  memberImage?: string;              // rasm (ixtiyoriy)
  memberPoints: number;              // ball
  createdAt: Date;                   // yaratilgan vaqt
  updatedAt: Date;                   // yangilangan vaqt
}

export interface MemberInput {       // RO'YXATDAN O'TISHDA (signup) yuboriladigan ma'lumot
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;                // majburiy
  memberPhone: string;               // majburiy
  memberPassword: string;            // majburiy
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {        // KIRISHDA (login) faqat 2 ta narsa kerak
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput { // PROFILNI YANGILASHDA hammasi ixtiyoriy
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}
```

#### `product.ts`
```ts
import {
  ProductCollection,
  ProductSize,
  ProductStatus,
} from "../enums/product.enum";      // kerakli enumlar

export interface Product {           // bitta taom
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;               // nomi
  productPrice: number;              // narxi
  productLeftCount: number;          // omborda nechta qolgan
  productSize: ProductSize;
  productVolume: number;             // hajmi
  productDesc?: string;              // tavsifi (ixtiyoriy)
  productImages: string[];           // rasmlar ro'yxati (matnlar massivi)
  productViews: number;              // necha marta ko'rilgan
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {    // mahsulotlarni qidirish/saralash so'rovi
  order: string;                     // saralash tartibi
  page: number;                      // nechanchi sahifa
  limit: number;                     // sahifada nechta
  productCollection?: ProductCollection; // turi bo'yicha filtr (ixtiyoriy)
  search?: string;                   // qidiruv matni (ixtiyoriy)
}
```

#### `screen.ts` (eng muhim: butun xotira shakli)
```ts
import { Member } from "./member";     // foydalanuvchi tipi
import { Product } from "./product";   // taom tipi

/** REACT APP STATE **/
export interface AppRootState {        // BUTUN ilovaning umumiy xotirasi
  homePage: HomePageState;             // har sahifaning o'z bo'limi bor
}

/** HOMEPAGE **/
export interface HomePageState {       // bosh sahifa xotirasida nimalar bor
  popularDishes: Product[];            // mashhur taomlar ro'yxati
  newDishes: Product[];                // yangi taomlar ro'yxati
  topUsers: Member[];                  // eng faol foydalanuvchilar ro'yxati
}

/** PRODUCTS PAGE **/                  // keyin to'ldiriladi
/** ORDERS PAGE **/                    // keyin to'ldiriladi
```

---

### 3.3. Slice (`homePage/slice.ts`): xotiraga YOZISH

```ts
import { createSlice } from "@reduxjs/toolkit";               // slice yaratuvchi funksiya
import { HomePageState } from "../../../lib/types/screen";    // xotira shakli

const initialState: HomePageState = {   // boshlang'ich holat
  popularDishes: [],                    // avval hammasi BO'SH ro'yxat
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",                     // slice nomi
  initialState,                         // yuqoridagi boshlang'ich holat
  reducers: {                           // reducer = xotirani o'zgartiruvchi funksiya
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;   // payload = tashqaridan kelgan yangi ma'lumot
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;                // action'larni komponentda ishlatish uchun chiqaramiz

const HomePageReducer = homePageSlice.reducer;  // reducer'ni store'ga ulash uchun
export default HomePageReducer;
```

---

### 3.4. Selector (`homePage/selector.ts`): xotiradan O'QISH

```ts
import { createSelector } from "reselect";                  // natijani eslab qoluvchi selector
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage; // butun store'dan faqat homePage

export const retrievePopularDishes = createSelector(
  selectHomePage,                          // 1) avval homePage bo'limini ol
  (HomePage) => HomePage.popularDishes,    // 2) undan faqat popularDishes ni ajrat
);
```

> ⚠️ Bu faylda hozircha faqat bitta selector bor. `retrieveNewDishes` va `retrieveTopUsers` hali yozilmagan (4-bo'limga qarang).

---

### 3.5. Store (`src/app/store.ts`): hammasini bir joyga yig'ish

```ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";   // YANGI: slice'ning reducer'i
import reduxLogger from "redux-logger";                   // YANGI: konsolga log yozuvchi

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>   // middleware = action o'tayotganda "oraliq tekshiruvchi"
    // @ts-ignore                         // TypeScript xatosini o'chirib turadi
    getDefaultMiddleware().concat(reduxLogger),  // standart middleware'ga logger qo'shildi
  reducer: {
    homePage: HomePageReducer,            // kalit "homePage" selector'dagi state.homePage bilan bir xil
  },
});

export type AppDispatch = typeof store.dispatch;           // dispatch turi
export type RootState = ReturnType<typeof store.getState>; // butun state turi
```

Eski holat: `reducer: {}` (bo'sh edi). Endi unga `homePage` ulandi.

---

### 3.6. HomePage (`homePage/index.tsx`): komponentda ishlatish

```tsx
import React, { useEffect } from "react";                  // useEffect qo'shildi
import Statistics from "./Statistics";                     // (eski import'lar o'zgarmagan)
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useDispatch, useSelector } from "react-redux";    // YANGI: Redux hook'lari
import { Dispatch } from "@reduxjs/toolkit";               // YANGI: dispatch turi
import { createSelector } from "reselect";                 // YANGI
import { setPopularDishes } from "./slice";                // YANGI: yozish action'i
import { retrievePopularDishes } from "./selector";        // YANGI: o'qish selector'i
import { Product } from "../../../lib/types/product";      // YANGI: taom tipi

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  // dispatch = "xotiraga buyruq yuborish". Uni qulay setPopularDishes(data) ko'rinishiga o'raymiz
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),   // natijani { popularDishes } obyektiga o'raydi
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());     // YOZISH funksiyasi
  const { popularDishes } = useSelector(popularDishesRetriever);  // O'QISH: store'dagi qiymat (hozir [])

  useEffect(() => {}, []);   // hozircha BO'SH: keyin shu yerga backend so'rovi yoziladi

  return (
    <div className={"homepage"}>   {/* JSX qismi o'zgarmagan */}
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

Fayl oxirida izohga olingan (`//`) eski o'quv varianti turibdi. Unda bitta taom ("Cutlet") qo'lda yozilgan va `setPopularDishes(result)` bilan store'ga yuborilgan. Bu keyingi qadam uchun namuna.

---

## 4. Topilgan xatolar va tuzatishlar

### 🔴 1. `redux-logger` `package.json` da yo'q
`store.ts` uni import qiladi, lekin `package.json` ga qo'shilmagan, shuning uchun toza o'rnatishda `Module not found` xatosi chiqadi.
```bash
yarn add redux-logger
yarn add -D @types/redux-logger
```

### 🔴 2. `selector.ts` da 2 ta selector yo'q
Faylga qo'shish kerak:
```ts
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes,      // yangi taomlar
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,       // eng faol foydalanuvchilar
);
```

### 🟠 3. `member.ts` to'liq emas
Agar `MemberInput` da `memberStatus`, `memberAddress`, `memberDesc`, `memberImage`, `memberPoints` yo'q bo'lsa va `MemberUpdateInput` bo'sh (`{}`) bo'lsa, 3.2-bo'limdagi to'liq variant bilan almashtiring. Bo'sh interface hech narsani tekshirmaydi.

### 🟠 4. `tsconfig.json`: noto'g'ri qator
```json
"ignoreDeprecations": "6.0",   // ← o'chiring
```
`package.json` da TypeScript `~4.1.5`, bu qator esa faqat TS 5.0+ da bor. U `Unknown compiler option` xatosini beradi.

### 🟠 5. `screen.ts` da qizil chiziq (`./member`, `./product`)
Repozitoriydagi nusxa xatosiz. Mahalliy kompyuterda tekshiring:
- `src/lib/types/` ichida `member.ts` va `product.ts` aynan kichik harf bilan bormi;
- ikkalasida ham `export interface ...` bormi;
- fayllar saqlanganmi (`Ctrl+S`);
- `Ctrl+Shift+P`, keyin **TypeScript: Restart TS Server**.

### 🟡 6. Ogohlantirishlar (xato emas)
- `index.tsx` da `setPopularDishes` va `popularDishes` e'lon qilingan, lekin ishlatilmagan.
- `useEffect(() => {}, [])` hozircha bo'sh.
- Fayl oxirida katta izohga olingan kod bloki turibdi.

---

## 5. Ironrabb bilan solishtirish (`ironrabb/burak-react`)

| Fayl | Natija |
|---|---|
| `store.ts`, `index.tsx`, `slice.ts`, `product.ts`, barcha `enums` | ✅ bir xil |
| `screen.ts` | ✅ bir xil (faqat izohlar farq qiladi) |
| `selector.ts` | ❌ 2 ta selector yo'q |
| `member.ts` | ❌ maydonlar to'liq emas |
| `package.json` | ❌ `redux-logger` va `@types/redux-logger` yo'q |

---

## 6. Keyingi qadam

`HomePage` ichidagi `useEffect` ni to'ldirish: backenddan ma'lumot olib, `setPopularDishes(...)` orqali store'ga yozish. Shunda `popularDishes` bo'sh ro'yxat emas, haqiqiy taomlar bilan to'ladi va `redux-logger` brauzer konsolida o'zgarishni ko'rsatadi.
