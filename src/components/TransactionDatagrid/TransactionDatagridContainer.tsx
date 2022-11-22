import { useCallback } from 'react'
import Box from '@mui/material/Box'

import { useGetTransactions, useUpdateTransactionCategory } from '../ApiSystem/api/transactions'
import { useGetCategories } from '../ApiSystem/api/categories'

import DataIsEmpty from '../DataStates/DataIsEmpty'
import DataIsError from '../DataStates/DataIsError'
import DataIsLoading from '../DataStates/DataIsLoading'
import TransactionDatagrid from './TransactionDatagrid'

import { routerLinks } from '../../shared/routerLinks'
import { TransactionWithCategory } from '../../types/types'

interface TransactionDatagridContainerProps {}
const TransactionDatagridContainer = ({}: TransactionDatagridContainerProps) => {
  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    refetch: retryTransactions
  } = useGetTransactions()

  const { mutate: updateTransactionCategory } = useUpdateTransactionCategory()

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    refetch: retryCategories
  } = useGetCategories()

  const retry = useCallback(() => {
    retryTransactions()
    retryCategories()
  }, [retryTransactions, retryCategories])

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
    updateTransactionCategory({
      id: transaction.id,
      category: transaction?.category?.id ?? undefined
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
