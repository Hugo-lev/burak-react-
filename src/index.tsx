import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Redux do'konini butun ilovaga ulash uchun
import { store } from "./app/store"; // Asosiy Redux store (markaziy xotira)
import App from "./app/App"; // Asosiy komponent
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline"; // Brauzer standart CSS-larini normallashtirish
import { ThemeProvider } from "@mui/material/styles"; // Material-UI dizayn mavzusini o'rnatish
import theme from "./app/MaterialTheme"; // Moslashtirilgan tema (ranglar, shriftlar)
import { BrowserRouter as Router } from "react-router-dom"; // Sahifalararo navigatsiya (routing) uchun
import { createRoot } from "react-dom/client"; // React 18 da ilovani DOMga ulash funksiyasi
import "./css/index.css";
import ContextProvider from "./app/context/ContextProvider"; // Global foydalanuvchi ma'lumotlari konteksti

// HTML dagi "root" id li konteynerni topamiz
const container = document.getElementById("root")!;
const root = createRoot(container);

// Ilovani rendering qilish jarayoni
root.render(
  <React.StrictMode>
    {/* Redux store barcha bolalar uchun mavjud bo'ladi */}
    <Provider store={store}>
      {/* Autentifikatsiya (login bo'lgan user) holatini ta'minlaydi */}
      <ContextProvider>
        {/* MUI mavzusi (theme) */}
        <ThemeProvider theme={theme}>
          {/* Standart stil o'rnatgich */}
          <CssBaseline />
          {/* Routing (sahifalar orasida o'tish) brauzer routeri */}
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
);

// Ilova unumdorligini tekshirish uchun
reportWebVitals();
