import { useCallback, useState } from "react"
import { Box } from "@chakra-ui/react"

import useGetFilteredSortedTransactions from "../hooks/useGetFilteredSortedTransactions"

import { DataIsEmpty, DataIsError, DataIsLoading } from "./TransactionTableStates"
import TransactionTable from "./TransactionTable"
import useGetCategories from "../hooks/useGetCategories"

import Filterbar from "../Filterbar/Filterbar"

interface DefaultFilterState {
  sortDirection: "asc" | "desc"
  startDate?: Date
  endDate?: Date
  onlyIncome: boolean
  onlySpending: boolean
}
const defaultFilterState: DefaultFilterState = {
  sortDirection: "desc",
  startDate: undefined,
  endDate: undefined,
  onlyIncome: false,
  onlySpending: false,
}

interface TransactionTableContainerProps {}
const TransactionTableContainer = ({}: TransactionTableContainerProps) => {
  const [filterState, setFilterState] = useState<DefaultFilterState>(defaultFilterState)

  function onFilterStateSet(newState: Partial<DefaultFilterState>) {
    setFilterState(state => ({ ...state, ...newState }))
  }

  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions,
  } = useGetFilteredSortedTransactions(filterState)
  const retryTransactions = useCallback(() => mutateTransactions(), [mutateTransactions])
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategories()
  const retryCategories = useCallback(() => mutateCategories(), [mutateCategories])

  if (isLoadingTransactions || isLoadingCategories) return <DataIsLoading />
  if (isErrorTransactions) return <DataIsError retry={retryTransactions} />
  if (isErrorCategories) return <DataIsError retry={retryCategories} />
  if (!transactions || transactions.length === 0) return <DataIsEmpty />
  return (
    <Box h="100%">
      <Box>
        <Filterbar filterState={filterState} onChange={onFilterStateSet} />
      </Box>
      <TransactionTable transactions={transactions} categories={categories || []} />
    </Box>
  )
}

export default TransactionTableContainer
