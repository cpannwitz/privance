import useSWR from "swr"
import { MonthlyTransactionsWithCategories } from "../../types/types"

export default function useGetMonthlyTransactions() {
  const { data, error, isValidating, mutate } = useSWR<{ data: MonthlyTransactionsWithCategories }>(
    `/api/transactions/getMonthlyTransactions`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}
