import { useMemo } from 'react'

import '@fontsource/source-sans-pro'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { CacheProvider as EmotionCacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import BaseLayout from './BaseLayout'
import getMuiTheme from './theme'

interface ThemeProviderProps {
  children?: React.ReactNode
}

function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}
const cache = createEmotionCache()
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const muiTheme = useMemo(() => getMuiTheme({ prefersDarkMode }), [prefersDarkMode])

  return (
    <EmotionCacheProvider value={cache}>
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline enableColorScheme />
        <BaseLayout>{children}</BaseLayout>
      </MUIThemeProvider>
    </EmotionCacheProvider>
  )
}
export default ThemeProvider
