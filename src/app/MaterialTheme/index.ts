import { createTheme } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/**
 * LIGHT THEME: theme'ning "xom" sozlamalari (oddiy obyekt)
 */
const light = {
  palette: {
    // "mode" = yorug' yoki qorong'i rejim. "as const" TypeScript'ga
    // "bu oddiy string emas, aynan 'light' degan qiymat" deydi
    mode: "light" as const,
    background: {
      default: "#f8f8ff", // sahifa foni
      paper: common.white, // Menu, Card kabi "qog'oz" komponentlar foni
    },
    primary: {
      contrastText: "#d7b586", // primary rang ustidagi matn rangi
      main: "#343434", // asosiy rang
    },
    secondary: {
      contrastText: "#343434",
      main: "#d7b586",
    },
    text: {
      primary: "#343434",
      secondary: "#d7b586",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: { root: { height: "100%" } },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#f4f6f8", height: "100%", minHeight: "100%" },
      },
    },
  },
  // "shadows" (oxirida s). MUI aynan 25 ta element kutadi
  shadows: shadow as Shadows,
  typography,
};

// 1-QADAM: createTheme "xom" sozlamalardan TAYYOR theme yasaydi.
// Aynan shu qator yo'q bo'lib qolgan edi
let theme = createTheme(light);

// 2-QADAM: tayyor theme'ni (breakpoints kerak bo'lgani uchun)
// ikkinchi marta kengaytiramiz
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          // lg (katta ekran) bo'lganda Container eni 1300px bo'lsin
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
  },
});

export default theme;
