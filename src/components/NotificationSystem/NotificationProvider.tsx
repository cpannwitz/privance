import { SnackbarProvider } from 'notistack'
import { PropsWithChildren } from 'react'

interface NotificationProviderProps {}

const NotificationProvider = ({ children }: PropsWithChildren<NotificationProviderProps>) => {
  return (
    <SnackbarProvider maxSnack={3} dense={true}>
      {children}
    </SnackbarProvider>
  )
}

export default NotificationProvider
