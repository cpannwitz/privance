import { useQuery } from '@tanstack/react-query'
import { AllTimeAggregations, MonthlyAggregations } from '../../../types/types'
import { ApiBase, API_MAP } from '../ApiBase'

const api = API_MAP.aggregations

// * GET

export function getAllTimeAggregations() {
  return ApiBase.get<AllTimeAggregations>(api.getAllTimeAggregations.url).then(res => res.data)
}

export function useGetAllTimeAggregations() {
  const query = useQuery({
    queryKey: api.getAllTimeAggregations.keys(),
    queryFn: getAllTimeAggregations
  })
  return query
}

export function getMonthlyAggregations() {
  return ApiBase.get<MonthlyAggregations>(api.getMonthlyAggregations.url).then(res => res.data)
}

export function useGetMonthlyAggregations() {
  const query = useQuery({
    queryKey: api.getMonthlyAggregations.keys(),
    queryFn: getMonthlyAggregations
  })
  return query
}
