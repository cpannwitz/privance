import { useCallback } from "react"
import useGetMonthlyAggregations from "../hooks/useGetMonthlyAggregations"
import MonthlyInsightGrid from "./MonthlyInsightGrid"
import { DataIsLoading, DataIsError, DataIsEmpty } from "./MonthlyInsightStates"

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

  if (isLoadingMonthlyTransactions) return <DataIsLoading />
  if (isErrorMonthlyTransactions) return <DataIsError retry={retry} />
  if (!monthlyAggregations) return <DataIsEmpty />

  return <MonthlyInsightGrid monthlyAggregations={monthlyAggregations} />
}

export default MonthlyInsight
