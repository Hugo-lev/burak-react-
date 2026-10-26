# Burak React loyihasi: konspekt

Bu konspektda React + TypeScript + Redux + MUI loyihasini sozlashda nimalar qilganimiz, kod ichidagi narsalar va uchragan xatolar oddiy tilda yozilgan.

---

## 1. Loyiha nima?

- **Create React App (CRA)**: React loyihasini tayyor sozlamalar bilan yaratadigan vosita.
- **TypeScript**: JavaScript'ga "tur" (type) qo'shadi, xatolarni kod yozayotganda ushlaydi.
- **Redux Toolkit**: ilovaning umumiy ma'lumotlarini (state) bitta joyda saqlaydi.
- **MUI (Material UI)**: tayyor chiroyli komponentlar (Button, Container va h.k.).
- **yarn**: kutubxonalarni o'rnatadigan paket menejeri (`npm` ga o'xshash).

## 2. Papka tuzilmasi

```
burak-react/
├── public/
│   └── index.html          ← React sahifasi shu yerga chiziladi
├── src/
│   ├── index.tsx           ← KIRISH fayli (CRA shuni qidiradi)
│   ├── theme.ts            ← MUI ranglari
│   ├── reportWebVitals.ts
│   ├── css/
│   │   ├── index.css
│   │   └── app.css
│   └── app/
│       ├── App.tsx         ← asosiy komponent
│       ├── store.ts        ← Redux store
│       └── MaterialTheme/
│           └── styled.tsx  ← RippleBadge komponenti
├── package.json            ← kutubxonalar va buyruqlar ro'yxati
├── tsconfig.json           ← TypeScript sozlamalari
├── .gitignore              ← gitga kirmaydigan fayllar
└── yarn.lock
```

**Qoida:** `public/index.html` va `src/index.tsx` bo'lmasa, `yarn start` ishlamaydi.

---

## 3. Kodlar tushuntirishi

### 3.1. `src/index.tsx` (kirish fayli)

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>          {/* Redux'ni ilovaga ulaydi */}
      <ThemeProvider theme={theme}>   {/* MUI ranglarini hammaga beradi */}
        <CssBaseline />               {/* brauzer CSS farqlarini tenglaydi */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")     {/* public/index.html dagi <div id="root"> */}
);

reportWebVitals();
```

- `ReactDOM.render(nima, qayerga)`: ilovani HTML'dagi `root` div ichiga chizadi.
- `Provider`, `ThemeProvider` "o'rovchi" komponentlar: ichidagi hamma narsa ularning imkoniyatlaridan foydalana oladi.
- React 18 da `render` ustiga chiziq tushadi (eskirgan), lekin ishlayveradi. Yangi usul:

```tsx
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
```

### 3.2. `src/theme.ts` (ranglar)

```ts
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: "#556cd6" }, // asosiy rang
    secondary: { main: "#19857b" }, // ikkinchi rang
    error: { main: red.A400 }, // xato rangi
  },
});

export default theme;
```

`createTheme` bergan ranglarni oladi, qolganini MUI o'zi to'ldiradi. Rangni o'zgartirish uchun faqat shu faylni tahrirlaymiz.

### 3.3. `src/app/App.tsx`

```tsx
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return (
    <Container maxWidth="sm">
      {" "}
      {/* markazga joylaydi, kengligi cheklangan */}
      <Stack flexDirection={"column"}>
        {" "}
        {/* ichidagilarni ustun qilib tizadi */}
        <Box sx={{ my: 4 }}>
          {" "}
          {/* sx = qisqa uslub, my = tepa-past bo'shliq */}
          <Typography variant="h4" component={"h4"}>
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={4}>
            {" "}
            {/* tugma burchagida "4" raqami */}
            <Button variant="contained">Contained</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
```

### 3.4. `src/app/MaterialTheme/styled.tsx`

```tsx
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const RippleBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      // badge ortidagi "to'lqin" halqa
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: `1px solid ${theme.palette.secondary.main}`,
      animation: "ripple 1.2s infinite ease-in-out",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": { transform: "scale(.8)", opacity: 1 },
    "100%": { transform: "scale(2.4)", opacity: 0 },
  },
}));
```

- `styled(Badge)(...)`: tayyor MUI komponentini o'z uslubing bilan "o'raydi".
- `export const` bilan eksport qilinsa, importda `{ RippleBadge }` (jingalak qavs bilan) yoziladi. `export default` bo'lsa, qavssiz yoziladi.

### 3.5. `tsconfig.json` (muhim qatorlar)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "react-jsx",
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

- `moduleResolution`: **`node`** bo'lishi kerak. `bundler` faqat TypeScript 5 da ishlaydi, bizda 4.9.
- `include: ["src"]`: TypeScript faqat `src` ichini tekshiradi.

### 3.6. `public/index.html` (eng muhim qator)

```html
<div id="root"></div>
```

`id` aynan `root` bo'lishi shart, chunki `index.tsx` shu nom bilan qidiradi.

### 3.7. `package.json` (qisqacha)

- `dependencies`: ilova ishlashi uchun kerak kutubxonalar (react, redux, MUI).
- `devDependencies`: faqat dasturlash vaqtida kerak (TypeScript tiplari).
- `scripts.start`: `react-scripts start`. Bu `yarn start` qilganda ishga tushadi.

---

## 4. Uchragan xatolar va yechimlari

| Xato                                               | Sababi                                                         | Yechimi                                                          |
| -------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `Could not find a required file. Name: index.js`   | `index.tsx` `src` ichida emas                                  | `index.tsx` ni `src` ichiga ko'chirish                           |
| `moduleResolution: bundler` xatosi                 | TypeScript 4.9 bilan mos emas                                  | `"moduleResolution": "node"`                                     |
| `import theme from "./css/index.css"`              | CSS faylni theme sifatida import qilingan                      | `createTheme` bilan `theme.ts` yozish                            |
| MUI topilmadi                                      | Kutubxona o'rnatilmagan                                        | `yarn add @mui/material @emotion/react @emotion/styled`          |
| `Cannot GET /`                                     | Port 3000 da boshqa (Express) server ishlayapti                | Boshqa serverni to'xtatish yoki `.env` ga `PORT=3001`            |
| `$ node server.js` chiqdi                          | `package.json` yo'q, yarn yuqoridagi papkadan boshqasini topdi | `package.json` ni qayta tiklash, `start` = `react-scripts start` |
| `Could not find index.html`                        | `public/index.html` yo'q yoki OneDrive'da bulutda              | Faylni yaratish / "Always keep on this device"                   |
| `JavaScript heap out of memory`                    | MUI 9 tiplari TypeScript 4.9 uchun og'ir                       | `yarn add @mui/material@^5.15.0`                                 |
| `~/node_modules/.../tsconfig.json` da qizil chiziq | Kutubxonaning ichki fayli                                      | E'tibor bermaslik, tahrirlamaslik                                |
| `ReactDOM.render` chizilgan                        | React 18 da eskirgan                                           | Ishlayveradi, xohlasa `createRoot` ga o'tish                     |

---

## 5. Git buyruqlari

```bash
git status                              # nima o'zgarganini ko'rish
git add .                               # hamma o'zgarishni commitga tayyorlash
git commit -m "xabar"                   # saqlash ("commit", "comment" emas!)
git push origin master                  # GitHub'ga yuborish
git pull                                # GitHub'dan yangi kodni olish

git restore .                           # saqlanmagan o'zgarishlarni bekor qilish
git restore fayl.ts                     # bitta faylni gitdagi holatiga qaytarish
git stash -u                            # o'zgarishlarni vaqtincha chetga olish
git stash pop                           # chetga olinganni qaytarish
git revert HEAD                         # oxirgi commitni teskari commit bilan bekor qilish

git rm -r --cached node_modules         # node_modules ni gitdan chiqarish (diskda qoladi)
git clone <manzil>                      # loyihani GitHub'dan nusxalash
```

**`.gitignore`** ichida `/node_modules` bo'lishi shart. U faqat **yangi** fayllarga ta'sir qiladi. Allaqachon gitga qo'shilganni `git rm --cached` bilan chiqarish kerak.

`node_modules` gitga yuklanmaydi, uni `yarn install` qayta tiklaydi.

---

## 6. Topshiriq: `chunkArray`

Arrayni berilgan uzunlikdagi bo'laklarga bo'lish:

```ts
function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size)); // slice: [boshi, oxiri) oralig'ini nusxalaydi
  }
  return result;
}

chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
// [[1,2,3], [4,5,6], [7,8,9], [10]]
```

- `i += size`: har safar bo'lak uzunligicha oldinga siljiymiz.
- `<T>`: har qanday turdagi array bilan ishlaydi.

---

## 7. Ishga tushirish (qisqa)

```bash
yarn install          # kutubxonalarni o'rnatish
yarn start            # http://localhost:3000 da ochiladi
```
