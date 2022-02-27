import { createTheme } from "@mui/material/styles";

/*
export const useStyles = makeStyles((theme) => {
  root: {
    
  }
});
*/
const primaryTextColor = "hsl(290, 0%, 90%)";
const secondaryTextColor = "hsl(280, 80%, 90%)";
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "hsl(290, 10%, 34%)",
      contrastText: primaryTextColor,
    },
    secondary: {
      main: "hsl(280, 50%, 20%)",
      contrastText: secondaryTextColor,
    },
  },
  typography: {
    fontFamily: ["Roboto"],
    h1: {
      fontSize: "8vw",
      color: primaryTextColor,
    },
    h2: {
      color: primaryTextColor,
    },
    h3: {
      color: primaryTextColor,
      fontSize: "3vw",
    },
    h4: {
      color: primaryTextColor,
    },
    h5: {
      color: primaryTextColor,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "hsl(0,0%,10%)",
        },
      },
    },
    MuiButton: {
      color: "red",
    },
  },
});
