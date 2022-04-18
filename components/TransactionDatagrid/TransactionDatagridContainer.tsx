import { useCallback } from "react"
import Box from "@mui/material/Box"
import axios, { AxiosError } from "axios"
import { useSnackbar } from "notistack"

import useGetTransactions from "../hooks/useGetTransactions"

import DataIsEmpty from "../DataStates/DataIsEmpty"
import DataIsError from "../DataStates/DataIsError"
import DataIsLoading from "../DataStates/DataIsLoading"
import TransactionDatagrid from "./TransactionDatagrid"

import { routerLinks } from "../../shared/config"
import { TransactionWithCategory } from "../../types/types"

interface TransactionDatagridContainerProps {}
const TransactionDatagridContainer = ({}: TransactionDatagridContainerProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions,
  } = useGetTransactions()

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

  function onUpdateTransaction(transaction: TransactionWithCategory) {
    axios
      .post<{ data: TransactionWithCategory }>("/api/transactions/updateTransactionCategory", {
        id: transaction.id,
        category: transaction?.category?.id ?? undefined,
      })
      .then(res => {
        enqueueSnackbar(`Updated your Transaction!`, {
          variant: "success",
        })

        const updatedTransaction = res.data.data

        mutateTransactions(async transactions => {
          if (!transactions) return transactions

          const index = transactions.data.findIndex(val => val.id === updatedTransaction.id)

          const data = [...transactions.data]
          data[index] = updatedTransaction

          return { data }
        }, false)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          enqueueSnackbar(`Couldn't update your transaction: ${error.response.data.error}`, {
            variant: "error",
          })
        }
      })
  }

  return (
    <Box sx={{ height: "100%" }}>
      <TransactionDatagrid transactions={transactions} onUpdateTransaction={onUpdateTransaction} />
    </Box>
  )
}

export default TransactionDatagridContainer
