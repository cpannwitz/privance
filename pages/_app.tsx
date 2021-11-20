import "../styles/globals.css"
import type { AppProps } from "next/app"
import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import SWRProvider from "../components/SWRProvider/SWRProvider"

function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={{ fontFamily: "Open Sans" }}>
      <NotificationsProvider>
        <SWRProvider>
          <Component {...pageProps} />
        </SWRProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
