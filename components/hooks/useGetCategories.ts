import useSWR from "swr"
import { Category } from ".prisma/client"

export default function useGetCategories() {
  const { data, error, isValidating, mutate } = useSWR<{ data: Category[] }>(
    `/api/categories/getCategories`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}
