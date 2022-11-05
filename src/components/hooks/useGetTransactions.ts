import useSWR from 'swr'
import type { TransactionWithCategory } from '../../types/types'

export default function useGetTransactions() {
  const { data, error, isValidating, mutate } = useSWR<{ data: TransactionWithCategory[] }>(
    `/api/transactions/getTransactions`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  }
}

// TODO: example, implement for all hooks

// import useSWR from 'swr'
// import { apiDir } from '../../shared/apiDir'

// const api = apiDir.transactions.getTransactions

// export default function useGetTransactions() {
//   const { data, error: isError, isValidating, mutate } = useSWR<{ data: typeof api.type }>(api.url)

//   return {
//     data: data?.data,
//     isLoading: (!isError && !data) || isValidating,
//     isError,
//     mutate
//   }
// }
