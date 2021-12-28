import { AxiosRequestConfig } from "axios"
import { useMemo } from "react"
import useSWR from "swr"
import { TransactionWithCategories } from "../../types/types"

interface UseGetFilteredSortedTransactionsProps {
  sortDirection?: "asc" | "desc"
  startDate?: Date | string
  endDate?: Date | string
  onlyIncome?: boolean
  onlySpending?: boolean
}
export default function useGetFilteredSortedTransactions({
  sortDirection,
  startDate,
  endDate,
  onlyIncome,
  onlySpending,
}: UseGetFilteredSortedTransactionsProps) {
  const requestConfig: AxiosRequestConfig = useMemo(
    () => ({ params: { sortDirection, startDate, endDate, onlyIncome, onlySpending } }),
    [sortDirection, startDate, endDate, onlyIncome, onlySpending]
  )
  const { data, error, isValidating, mutate } = useSWR<{ data: TransactionWithCategories[] }>([
    `/api/transactions/getFilteredSortedTransactions`,
    requestConfig,
  ])

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}
