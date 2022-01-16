import { createTheme, responsiveFontSizes } from "@mui/material";

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Sora", "Rubik", "sans-serif"].join(","),
  },
  // palette: {
  //   primary: {
  //     main: "#00003F",
  //     contrastText: "#FFFFFF",
  //   },
  //   text: {
  //     primary: "#BD4CFF",
  //   },
  // },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

const { breakpoints, palette } = defaultTheme;

let theme = {
  ...defaultTheme,
  overrides: {
    MuiButton: {
      root: {
        background: "linear-gradient(0deg, #BD4CFF, #2B59F0)",
        borderRadius: 10000,
        color: "white",
        fontWeight: 400,
        letterSpacing: 0.2,
        fontSize: "0.9rem",
        padding: "0.6rem 2rem",
        "& > span": {
          zIndex: 1,
        },
        "&::after": {
          content: "''",
          background: palette.primary.main,
          position: "absolute",
          inset: 3,
          borderRadius: "inherit",
        },
      },
      contained: {
        color: "#FFFFFF",
      },
    },
    MuiContainer: {
      root: {
        paddingTop: "5rem",
        paddingBottom: "5rem",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "white",
        height: 1,
        margin: "auto 20px",
      },
    },

    MuiTypography: {
      color: "#FFFFFF",
      gutterBottom: {
        marginBottom: "0.5rem",
      },
      h1: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "2.75rem",
        fontWeight: 700,
        lineHeight: 1,
        [breakpoints.down("xs")]: {
          fontSize: "2.5rem",
        },
      },
      h2: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "2.5rem",
        fontWeight: 500,
        lineHeight: 1.3,
        [breakpoints.down("xs")]: {
          fontSize: "2rem",
        },
      },
      // h3: {
      //   fontFamily: "'Montserrat', sans-serif",
      //   fontSize: "2rem",
      //   [breakpoints.down("xs")]: {
      //     fontSize: "1rem",
      //   },
      // },
      h4: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "1.75rem",
        fontWeight: 500,
        [breakpoints.down("xs")]: {
          fontSize: "1.5rem",
        },
      },
      h5: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      h6: {
        fontFamily: "'Sora', sans-serif",
        fontSize: "1.2rem",
        fontWeight: 500,
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      subtitle1: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      subtitle2: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      body1: {
        fontSize: "1.1rem",
        fontWeight: 300,
        letterSpacing: 0.2,
        wordSpacing: 1,
        lineHeight: 1.7,
        "& + &": {
          marginTop: "2rem",
        },
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      body2: {
        fontSize: "20rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      button: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      caption: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
      overline: {
        fontSize: "2rem",
        [breakpoints.down("xs")]: {
          fontSize: "1rem",
        },
      },
    },
  },
};

theme = responsiveFontSizes(theme);

export default theme;
