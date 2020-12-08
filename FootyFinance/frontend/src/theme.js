import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4c8c4a",
      main: "#1b5e20",
      dark: "#003300",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#d3b8ae",
      main: "#a1887f",
      dark: "#725b53",
      contrastText: "#000000",
    },
    profit: {
      light: "#82e9de",
      main: "#4db6ac",
      dark: "#00867d",
      contrastText: "#000000",
      contrastTextV2: "#ffffff",
    },
    loss: {
      light: "#ff5131",
      main: "#d50000",
      dark: "#9b0000",
      contrastText: "#ffffff",
    },
  },
});
export default theme;
