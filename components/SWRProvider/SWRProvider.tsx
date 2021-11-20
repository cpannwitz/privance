import { useNotifications } from "@mantine/notifications"
import axios, { AxiosError } from "axios"
import { SWRConfig } from "swr"

interface SWRProviderProps {
  children?: React.ReactNode
}
const SWRProvider = ({ children }: SWRProviderProps) => {
  const notifications = useNotifications()
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then(res => res.data),
        onError: (err: AxiosError) =>
          err.response
            ? notifications.showNotification({ message: err.response.statusText, color: "red" })
            : null,
        shouldRetryOnError: false,
        focusThrottleInterval: 60000,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
