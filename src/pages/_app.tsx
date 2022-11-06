import { AppProps } from 'next/app'

import ApiCacheProvider from '../components/ApiSystem/ApiCacheProvider'
import ThemeProvider from '../components/ThemeSystem/ThemeProvider'
import NotificationProvider from '../components/NotificationSystem/NotificationProvider'

function App({ Component, pageProps }: AppProps) {
  return (
    <ApiCacheProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </ThemeProvider>
    </ApiCacheProvider>
  )
}

export default App
