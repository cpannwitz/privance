import { useCallback } from "react"
import useGetMonthlyAggregations from "../hooks/useGetMonthlyAggregations"
import MonthlyInsightGrid from "./MonthlyInsightGrid"
import DataIsEmpty from "../DataStates/DataIsEmpty"
import DataIsError from "../DataStates/DataIsError"
import DataIsLoading from "../DataStates/DataIsLoading"
import { routerLinks } from "../../shared/config"

interface MonthlyInsightProps {}

const MonthlyInsight = ({}: MonthlyInsightProps) => {
  const {
    data: monthlyAggregations,
    isError: isErrorMonthlyTransactions,
    isLoading: isLoadingMonthlyTransactions,
    mutate: mutateMonthlyTransactions,
  } = useGetMonthlyAggregations()

  const retry = useCallback(() => {
    mutateMonthlyTransactions()
  }, [mutateMonthlyTransactions])

  if (isLoadingMonthlyTransactions) {
    return <DataIsLoading />
  }
  if (isErrorMonthlyTransactions) {
    return <DataIsError retry={retry} />
  }
  if (!monthlyAggregations) {
    return <DataIsEmpty linkUrl={routerLinks.UPLOAD} />
  }

  return <MonthlyInsightGrid monthlyAggregations={monthlyAggregations} />
}

export default MonthlyInsight
