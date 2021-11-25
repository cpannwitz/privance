import { useCallback } from "react"

import useGetTransactions from "../hooks/useGetTransactions"

import { DataIsEmpty, DataIsError, DataIsLoading } from "./DatatableStates"
import Datatable from "./Datatable"

interface DatatableContainerProps {}

const DatatableContainer = ({}: DatatableContainerProps) => {
  const { data, isError, isLoading, mutate } = useGetTransactions()
  const retry = useCallback(() => mutate(), [mutate])

  if (isLoading) return <DataIsLoading />
  if (isError) return <DataIsError retry={retry} />
  if (!data || data.length === 0) return <DataIsEmpty />
  return <Datatable data={data} />
}

export default DatatableContainer
