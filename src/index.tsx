import React from "react";
// ReactDOM.render o'rniga createRoot ishlatamiz
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import "./css/index.css";

// 1) HTML dagi <div id="root"> ni topamiz ("!" = u albatta bor)
const container = document.getElementById("root")!;

// 2) Shu element uchun "ildiz" (root) yaratamiz
const root = createRoot(container);

// 3) Ilovani chizamiz
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
