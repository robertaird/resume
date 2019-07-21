import { createMuiTheme, colors } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: { default: "#1a1a1a", paper: "#3a3a3a" },
    primary: colors.teal
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        maxWidth: 600,
        backgroundColor: "#21252b"
      }
    }
  }
});

export default theme;
