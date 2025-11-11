import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    allVariants: {
      color: "white",
      fontWeight: 400,
    },
    fontFamily: "Sixtyfour, sans-serif",
  },
  palette: {
    background: {
      default: "#000000",
    },
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    text: { primary: "#ffffff" },
  },
});
