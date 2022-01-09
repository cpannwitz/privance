import { useCallback, useState } from "react"
import { Box } from "@chakra-ui/react"

import useGetFilteredSortedTransactions from "../hooks/useGetFilteredSortedTransactions"
import useGetCategories from "../hooks/useGetCategories"

import DataIsEmpty from "../DataStates/DataIsEmpty"
import DataIsError from "../DataStates/DataIsError"
import DataIsLoading from "../DataStates/DataIsLoading"
import TransactionTable from "./TransactionTable"

import Filterbar from "../Filterbar/Filterbar"
import { routerLinks } from "../../shared/config"

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

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategories()

  const retry = useCallback(() => {
    mutateTransactions()
    mutateCategories()
  }, [mutateCategories])

  if (isLoadingTransactions || isLoadingCategories) {
    return <DataIsLoading />
  }
  if (!transactions || isErrorTransactions || !categories || isErrorCategories) {
    return <DataIsError retry={retry} />
  }
  if (transactions.length === 0) {
    return <DataIsEmpty linkUrl={routerLinks.UPLOAD} />
  }
  return (
    <Box h="100%">
      <Box>
        <Filterbar filterState={filterState} onChange={onFilterStateSet} />
      </Box>
      <TransactionTable
        transactions={transactions}
        categories={categories}
        mutateTransactions={mutateTransactions}
      />
    </Box>
  )
}

export default TransactionTableContainer
