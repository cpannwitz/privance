import { createTheme } from "@mui/material/styles"

import type {} from "@mui/x-data-grid/themeAugmentation"

declare module "@mui/material/styles" {
  interface Theme {
    // status: {
    //   what: string
    // }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    // status?: {
    //   what?: string
    // }
  }
}

const theme = ({ prefersDarkMode = false }) =>
  createTheme({
    // status: {
    //   what: "#ffffff",
    // },
    typography: {
      fontFamily:
        "Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    },
    palette: {
      primary: {
        main: "#7575C1",
      },
      secondary: {
        main: "#ef5350",
      },
      mode: prefersDarkMode ? "dark" : "light",
      ...(prefersDarkMode === true
        ? {
            text: {
              primary: "rgba(255, 255, 255, 0.85)",
            },
            action: {
              active: "rgba(255, 255, 255, 0.85)",
            },
            background: {
              default: "#1A202C",
              paper: "#1A202C",
            },
          }
        : {}),
    },
    components: {
      MuiInput: {
        defaultProps: {
          size: "small",
        },
      },
      MuiSelect: {
        defaultProps: {
          size: "small",
        },
      },
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
    },
  })

export default theme
