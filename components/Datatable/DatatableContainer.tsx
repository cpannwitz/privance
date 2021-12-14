import { useCallback } from "react"
import { Box } from "@chakra-ui/react"

import useGetTransactions from "../hooks/useGetTransactions"

import { DataIsEmpty, DataIsError, DataIsLoading } from "./DatatableStates"
import Datatable from "./Datatable"
import useGetCategories from "../hooks/useGetCategories"

interface DatatableContainerProps {}

const DatatableContainer = ({}: DatatableContainerProps) => {
  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions,
  } = useGetTransactions()
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
      <Datatable transactions={transactions} categories={categories || []} />
    </Box>
  )
}

export default DatatableContainer
