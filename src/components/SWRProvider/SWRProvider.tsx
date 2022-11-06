import { SWRConfig } from 'swr'
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { useNotification } from '../NotificationSystem/useNotification'
import type { ApiResponseData } from '../../shared/apiHelpers'

interface SWRProviderProps {
  children?: React.ReactNode
}

const SWRProvider = ({ children }: SWRProviderProps) => {
  const { notify } = useNotification()
  return (
    <SWRConfig
      value={{
        fetcher: (url: string, requestConfig: AxiosRequestConfig) =>
          axios.get(url, requestConfig).then(res => res.data),
        onError: (err: AxiosError<ApiResponseData<unknown>>) =>
          notify(
            err.response?.data.error?.message || 'Internal Server Error | Please retry',
            'error'
          ),
        shouldRetryOnError: false,
        focusThrottleInterval: 60000,
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
