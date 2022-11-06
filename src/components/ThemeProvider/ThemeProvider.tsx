import '@fontsource/source-sans-pro'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import getMuiTheme from './theme'

import { useMemo } from 'react'

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
    <CacheProvider value={cache}>
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  )
}
export default ThemeProvider
