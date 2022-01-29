// .storybook/preview.js
import React from "react"

import "@fontsource/source-sans-pro"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import muiTheme from "../components/ThemeProvider/theme"
import { theme } from "../components/ThemeProvider/ThemeProvider"

import { ChakraProvider } from "@chakra-ui/react"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

function createEmotionCache() {
  return createCache({ key: "css" })
}
const cache = createEmotionCache()

export const decorators = [
  Story => (
    <CacheProvider value={cache}>
      <MUIThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Story />
        </ChakraProvider>
      </MUIThemeProvider>
    </CacheProvider>
  ),
]
