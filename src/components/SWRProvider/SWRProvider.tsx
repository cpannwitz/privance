import { useSnackbar } from 'notistack'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { SWRConfig } from 'swr'

interface SWRProviderProps {
  children?: React.ReactNode
}

// TODO: queryparams in fetcher
const SWRProvider = ({ children }: SWRProviderProps) => {
  const { enqueueSnackbar } = useSnackbar()
  return (
    <SWRConfig
      value={{
        fetcher: (url: string, requestConfig: AxiosRequestConfig) =>
          axios.get(url, requestConfig).then(res => res.data),
        onError: (err: AxiosError) =>
          err.response ? enqueueSnackbar(err.response.statusText, { variant: 'error' }) : null,
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
