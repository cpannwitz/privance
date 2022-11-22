import { useCallback } from 'react'
import { useGetAllTimeAggregations } from '../ApiSystem/api/aggregations'
import AllTimeInsightContent from './AllTimeInsightContent'
import DataIsLoading from '../DataStates/DataIsLoading'
import DataIsEmpty from '../DataStates/DataIsEmpty'
import DataIsError from '../DataStates/DataIsError'
import { routerLinks } from '../../shared/routerLinks'

interface AllTimeInsightProps {}

const AllTimeInsight = ({}: AllTimeInsightProps) => {
  const {
    data: allTimeAggregations,
    isError: isErrorAllTimeAggregations,
    isLoading: isLoadingAllTimeAggregations,
    refetch: retryAllTimeAggregations
  } = useGetAllTimeAggregations()

  const retry = useCallback(() => {
    retryAllTimeAggregations()
  }, [retryAllTimeAggregations])

  if (isLoadingAllTimeAggregations) {
    return <DataIsLoading />
  }
  if (isErrorAllTimeAggregations) {
    return <DataIsError retry={retry} />
  }
  if (!allTimeAggregations) {
    return <DataIsEmpty linkUrl={routerLinks.UPLOAD} />
  }

  return <AllTimeInsightContent allTimeAggregations={allTimeAggregations} />
}

export default AllTimeInsight
