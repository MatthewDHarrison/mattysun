import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  typography: {
    allVariants: {
      color: "white",
    },
  },
  palette: {
    background: {
      default: "#3A1F04",
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
  },
});
