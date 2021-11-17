import "../styles/globals.css"
import type { AppProps } from "next/app"
import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ fontFamily: "Open Sans" }}>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default MyApp
