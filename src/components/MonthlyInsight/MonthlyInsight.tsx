import { useCallback } from 'react'
import MonthlyInsightGrid from './MonthlyInsightGrid'
import DataIsEmpty from '../DataStates/DataIsEmpty'
import DataIsError from '../DataStates/DataIsError'
import DataIsLoading from '../DataStates/DataIsLoading'
import { routerLinks } from '../../shared/routerLinks'
import { TransactionWithCategory } from '../../types/types'
import { useGetMonthlyAggregations } from '../ApiSystem/api/aggregations'
import { useUpdateTransactionCategory } from '../ApiSystem/api/transactions'

interface MonthlyInsightProps {}

const MonthlyInsight = ({}: MonthlyInsightProps) => {
  const { mutate: updateTransactionCategory } = useUpdateTransactionCategory()

  const {
    data: monthlyAggregations,
    isError: isErrorMonthlyTransactions,
    isLoading: isLoadingMonthlyTransactions,
    refetch: retryMonthlyTransactions
  } = useGetMonthlyAggregations()

  const retry = useCallback(() => {
    retryMonthlyTransactions()
  }, [retryMonthlyTransactions])

  if (isLoadingMonthlyTransactions) {
    return <DataIsLoading />
  }
  if (isErrorMonthlyTransactions) {
    return <DataIsError retry={retry} />
  }
  if (!monthlyAggregations) {
    return <DataIsEmpty linkUrl={routerLinks.UPLOAD} />
  }

  function onUpdateTransaction(transaction: TransactionWithCategory) {
    updateTransactionCategory({
      id: transaction.id,
      category: transaction?.category?.id ?? undefined
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
