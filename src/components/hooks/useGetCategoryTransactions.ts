import { AxiosRequestConfig } from 'axios'
import { useMemo } from 'react'
import useSWR from 'swr'
import { CategoryWithTransactions } from '../../types/types'

export default function useGetCategoryTransactions(id: number) {
  const requestConfig: AxiosRequestConfig = useMemo(() => ({ params: { id: id } }), [id])
  const { data, error, isValidating, mutate } = useSWR<{ data: CategoryWithTransactions }>([
    `/api/categories/getCategoryTransactions`,
    requestConfig
  ])

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  }
}
