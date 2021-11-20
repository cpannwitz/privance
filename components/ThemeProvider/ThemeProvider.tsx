import { MantineProvider, ColorSchemeProvider, ColorScheme } from "@mantine/core"
import { useColorScheme, useLocalStorageValue } from "@mantine/hooks"
import { NotificationsProvider } from "@mantine/notifications"

interface ThemeProviderProps {
  children?: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const preferredColorScheme = useColorScheme()

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
  })

  function toggleColorScheme(value?: ColorScheme) {
    if (!colorScheme) {
      setColorScheme(value || (preferredColorScheme === "dark" ? "light" : "dark"))
    } else {
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
    }
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme || preferredColorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ fontFamily: "Open Sans", colorScheme: colorScheme || preferredColorScheme }}
      >
        <NotificationsProvider>{children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
export default ThemeProvider
