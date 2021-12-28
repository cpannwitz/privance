import { useCallback } from "react"
import useGetFilteredSortedTransactions from "../hooks/useGetFilteredSortedTransactions"
import useGetMonthlyTransactions from "../hooks/useGetMonthlyTransactions"
import MonthlyInsightGrid from "./MonthlyInsightGrid"
import { DataIsLoading, DataIsError, DataIsEmpty } from "./MonthlyInsightStates"

interface CategoriesProps {}

const Categories = ({}: CategoriesProps) => {
  const {
    data: monthlyTransactions,
    isError: isErrorMonthlyTransactions,
    isLoading: isLoadingMonthlyTransactions,
    mutate: mutateMonthlyTransactions,
  } = useGetMonthlyTransactions()

  const retryMonthlyTransactions = useCallback(
    () => mutateMonthlyTransactions(),
    [mutateMonthlyTransactions]
  )

  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions,
  } = useGetFilteredSortedTransactions({ sortDirection: "asc" })
  const retryTransactions = useCallback(() => mutateTransactions(), [mutateTransactions])

  if (isLoadingTransactions || isLoadingMonthlyTransactions) return <DataIsLoading />
  if (isErrorTransactions) return <DataIsError retry={retryTransactions} />
  if (isErrorMonthlyTransactions || isErrorTransactions)
    return <DataIsError retry={retryMonthlyTransactions} />
  if (!transactions || transactions.length === 0 || !monthlyTransactions) return <DataIsEmpty />

  return (
    <MonthlyInsightGrid transactions={transactions} monthlyTransactions={monthlyTransactions} />
  )
}

export default Categories
