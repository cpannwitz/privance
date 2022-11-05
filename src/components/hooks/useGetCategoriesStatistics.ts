import useSWR from 'swr'
import { CategoriesStatistics } from '../../types/types'

export default function useGetCategoriesStatistics() {
  const { data, error, isValidating, mutate } = useSWR<{ data: CategoriesStatistics }>(
    `/api/categories/getCategoriesStatistics`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  }
}
