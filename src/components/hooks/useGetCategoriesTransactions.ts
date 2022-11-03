import useSWR from 'swr'
import { CategoryWithTransactions } from '../../types/types'

export default function useGetCategoriesTransactions() {
  const { data, error, isValidating, mutate } = useSWR<{ data: CategoryWithTransactions[] }>(
    `/api/categories/getCategoriesTransactions`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  }
}
