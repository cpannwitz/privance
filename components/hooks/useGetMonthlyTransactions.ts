import useSWR from "swr"
import { MonthlyTransactions } from "../../types/types"

export default function useGetMonthlyTransactions() {
  const { data, error, isValidating, mutate } = useSWR<{ data: MonthlyTransactions }>(
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
