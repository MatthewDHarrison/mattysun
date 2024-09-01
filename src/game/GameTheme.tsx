import { createTheme } from "@mui/material";

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

declare module "@mui/material/styles" {
  interface Palette {
    light?: string;
    dark?: string;
    dark1?: string;
    light1?: string;
    light2?: string;
    red?: string;
  }
  interface PaletteOptions {
    light?: string;
    dark?: string;
    dark1?: string;
    light1?: string;
    light2?: string;
    red?: string;
  }
}

const light = "#d4e2cc";
const dark = "#090811";
const dark1 = "#17152e";
const dark2 = "#3c566c";
const light1 = "#84aea4";
const light2 = "#3c566c";
const red = "#e43254";

export const gameTheme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "game" },
          style: {
            fontFamily: "fantasy",
            color: light,
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
            color: light,
            backgroundColor: dark,
            border: `1px solid ${light}`,
            borderRadius: 0,
            "&:hover": {
              backgroundColor: light,
              color: dark,
            },
          },
        },
      ],
    },
  },
  typography: {
    allVariants: {
      color: light,
    },
  },
  palette: {
    background: {
      default: dark,
    },
    dark: dark,
    dark1: dark1,
    light2: light2,
    light1: light1,
    light: light,
    red: red,
  },
});
