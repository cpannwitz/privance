import { useCallback } from "react"
import useGetMonthlyAggregations from "../hooks/useGetMonthlyAggregations"
import MonthlyInsightGrid from "./MonthlyInsightGrid"
import DataIsEmpty from "../DataStates/DataIsEmpty"
import DataIsError from "../DataStates/DataIsError"
import DataIsLoading from "../DataStates/DataIsLoading"
import routerLinks from "../../shared/routerLinks"
import { TransactionWithCategory } from "../../types/types"
import { useSnackbar } from "notistack"
import axios, { AxiosError } from "axios"

interface MonthlyInsightProps {}

const MonthlyInsight = ({}: MonthlyInsightProps) => {
  const { enqueueSnackbar } = useSnackbar()

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

  function onUpdateTransaction(year: string, month: string, transaction: TransactionWithCategory) {
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

        mutateMonthlyTransactions(async monthlyAggregations => {
          if (!monthlyAggregations) return monthlyAggregations

          const index = monthlyAggregations.data.years[year].months[month].transactions.findIndex(
            val => val.id === updatedTransaction.id
          )

          const transactions = [...monthlyAggregations.data.years[year].months[month].transactions]
          transactions[index] = updatedTransaction

          const data = { ...monthlyAggregations.data }
          data.years[year].months[month].transactions = transactions

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
    <MonthlyInsightGrid
      monthlyAggregations={monthlyAggregations}
      onUpdateTransaction={onUpdateTransaction}
    />
  )
}

export default MonthlyInsight
