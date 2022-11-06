import '../styles/globals.css'
import { AppProps } from 'next/app'

import SWRProvider from '../components/SWRProvider/SWRProvider'
import BaseLayout from '../components/BaseLayout/BaseLayout'
import ThemeProvider from '../components/ThemeProvider/ThemeProvider'
import NotificationProvider from '../components/NotificationSystem/NotificationProvider'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <SWRProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </SWRProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App
