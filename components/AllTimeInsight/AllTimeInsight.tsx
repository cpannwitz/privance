import { useCallback } from "react"
import useGetAllTimeAggregations from "../hooks/useGetAllTimeAggregations"
import AllTimeInsightContent from "./AllTimeInsightContent"
import DataIsLoading from "../DataStates/DataIsLoading"
import DataIsEmpty from "../DataStates/DataIsEmpty"
import DataIsError from "../DataStates/DataIsError"
import { routerLinks } from "../../shared/config"

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
