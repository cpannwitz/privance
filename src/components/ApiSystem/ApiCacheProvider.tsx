import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3
    },
    mutations: {
      retry: 0
    }
  }
})

interface SWRProviderProps {
  children?: React.ReactNode
}

const ApiCacheProvider = ({ children }: SWRProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default ApiCacheProvider
