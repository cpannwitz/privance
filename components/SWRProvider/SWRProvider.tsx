import { useToast } from "@chakra-ui/react"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { SWRConfig } from "swr"

interface SWRProviderProps {
  children?: React.ReactNode
}

// TODO: queryparams in fetcher
const SWRProvider = ({ children }: SWRProviderProps) => {
  const toast = useToast()
  return (
    <SWRConfig
      value={{
        fetcher: (url: string, requestConfig: AxiosRequestConfig) =>
          axios.get(url, requestConfig).then(res => res.data),
        onError: (err: AxiosError) =>
          err.response ? toast({ title: err.response.statusText, status: "error" }) : null,
        shouldRetryOnError: false,
        focusThrottleInterval: 60000,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
