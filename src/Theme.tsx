import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    game: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    game: true;
  }
}

export const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "game" },
          style: {
            fontFamily: "fantasy",
            color: "white",
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "game" },
          style: {
            fontFamily: "fantasy",
            color: "white",
            backgroundColor: "black",
            border: "1px solid white",
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          },
        },
      ],
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
  palette: {
    background: {
      default: "#0196D9",
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
