import "../styles/globals.css"
import type { AppProps } from "next/app"

import SWRProvider from "../components/SWRProvider/SWRProvider"
import BaseLayout from "../components/BaseLayout/BaseLayout"
import ThemeProvider from "../components/ThemeProvider/ThemeProvider"

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <SWRProvider>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </SWRProvider>
    </ThemeProvider>
  )
}

export default App
