import useSWR from 'swr'
import { AllTimeAggregations } from '../../types/types'

export default function useGetAllTimeAggregations() {
  const { data, error, isValidating, mutate } = useSWR<{ data: AllTimeAggregations }>(
    `/api/aggregations/getAllTimeAggregations`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  }
}
