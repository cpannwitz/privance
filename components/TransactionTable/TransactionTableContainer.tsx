import { useCallback, useState } from "react"
import Box from "@mui/material/Box"

import useGetFilteredSortedTransactions from "../hooks/useGetFilteredSortedTransactions"

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

  const retry = useCallback(() => {
    mutateTransactions()
  }, [mutateTransactions])

  if (isLoadingTransactions) {
    return <DataIsLoading />
  }
  if (!transactions || isErrorTransactions) {
    return <DataIsError retry={retry} />
  }
  if (transactions.length === 0) {
    return <DataIsEmpty linkUrl={routerLinks.UPLOAD} />
  }
  return (
    <Box sx={{ height: "100%" }}>
      <Box>
        <Filterbar filterState={filterState} onChange={onFilterStateSet} />
      </Box>
      <TransactionTable transactions={transactions} mutateTransactions={mutateTransactions} />
    </Box>
  )
}

export default TransactionTableContainer
