import useSWR from "swr"
import { TransactionWithCategory } from "../../types/types"

export default function useGetTransactions() {
  const { data, error, isValidating, mutate } = useSWR<{ data: TransactionWithCategory[] }>(
    `/api/transactions/getTransactions`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}
