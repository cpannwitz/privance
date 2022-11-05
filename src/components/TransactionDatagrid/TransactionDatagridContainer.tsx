import { useCallback } from 'react'
import Box from '@mui/material/Box'
import axios, { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'

import useGetTransactions from '../hooks/useGetTransactions'
import useGetCategories from '../hooks/useGetCategories'

import DataIsEmpty from '../DataStates/DataIsEmpty'
import DataIsError from '../DataStates/DataIsError'
import DataIsLoading from '../DataStates/DataIsLoading'
import TransactionDatagrid from './TransactionDatagrid'

import routerLinks from '../../shared/routerLinks'
import { TransactionWithCategory } from '../../types/types'

interface TransactionDatagridContainerProps {}
const TransactionDatagridContainer = ({}: TransactionDatagridContainerProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions
  } = useGetTransactions()

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories
  } = useGetCategories()

  const retry = useCallback(() => {
    mutateTransactions()
    mutateCategories()
  }, [mutateTransactions, mutateCategories])

  if (isLoadingTransactions || isLoadingCategories) {
    return <DataIsLoading />
  }
  if (!transactions || isErrorTransactions || !categories || isErrorCategories) {
    return <DataIsError retry={retry} />
  }
  if (transactions.length === 0) {
    return <DataIsEmpty linkUrl={routerLinks.UPLOAD} />
  }

  function onUpdateTransaction(transaction: TransactionWithCategory) {
    axios
      .post<{ data: TransactionWithCategory }>('/api/transactions/updateTransactionCategory', {
        id: transaction.id,
        category: transaction?.category?.id ?? undefined
      })
      .then(res => {
        enqueueSnackbar(`Updated your Transaction!`, {
          variant: 'success'
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
      .catch((error: AxiosError<any>) => {
        if (error.response) {
          enqueueSnackbar(`Couldn't update your transaction: ${error.response.data.error}`, {
            variant: 'error'
          })
        }
      })
  }

  return (
    <Box sx={{ height: '100%' }}>
      <TransactionDatagrid
        transactions={transactions}
        categories={categories}
        onUpdateTransaction={onUpdateTransaction}
      />
    </Box>
  )
}

export default TransactionDatagridContainer
