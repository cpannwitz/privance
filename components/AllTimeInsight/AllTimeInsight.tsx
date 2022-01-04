import { useCallback } from "react"
import useGetAllTimeAggregations from "../hooks/useGetAllTimeAggregations"
import AllTimeInsightContent from "./AllTimeInsightContent"
import { DataIsLoading, DataIsError, DataIsEmpty } from "./AllTimeInsightStates"

interface AllTimeInsightProps {}

const AllTimeInsight = ({}: AllTimeInsightProps) => {
  const {
    data: allTimeAggregations,
    isError: isErrorAllTimeAggregations,
    isLoading: isLoadingAllTimeAggregations,
    mutate: mutateAllTimeAggregations,
  } = useGetAllTimeAggregations()

  const retry = useCallback(() => {
    mutateAllTimeAggregations()
  }, [mutateAllTimeAggregations])

  if (isLoadingAllTimeAggregations) return <DataIsLoading />
  if (isErrorAllTimeAggregations) return <DataIsError retry={retry} />
  if (!allTimeAggregations) return <DataIsEmpty />

  return <AllTimeInsightContent allTimeAggregations={allTimeAggregations} />
}

export default AllTimeInsight
