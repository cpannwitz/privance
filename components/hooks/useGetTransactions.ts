import useSWR from "swr"
import { TransactionWithCategories } from "../../types/types"

export default function useGetTransactions() {
  const { data, error, isValidating, mutate } = useSWR<{ data: TransactionWithCategories[] }>(
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
