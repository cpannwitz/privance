import { Prisma, Transaction } from '@prisma/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { TransactionBeforeUpload, TransactionWithCategory } from '../../../types/types'
import { ApiBase, API_MAP } from '../ApiBase'
import { queryClient } from '../ApiCacheProvider'

const api = API_MAP.transactions

// * GET

export function getTransactions() {
  return ApiBase.get<TransactionWithCategory[]>(api.getTransactions.url).then(res => res.data)
}

export function useGetTransactions() {
  const query = useQuery({
    queryKey: api.getTransactions.keys(),
    queryFn: getTransactions
  })
  return query
}

// * ADD

export function addTransactions(transactions: TransactionBeforeUpload[]) {
  return ApiBase.post<TransactionWithCategory[]>(api.addTransaction.url, transactions).then(
    res => res.data
  )
}

export function useAddTransactions() {
  const mutation = useMutation({
    mutationFn: addTransactions,
    onSuccess: () =>
      api.addTransaction.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}

// * UPDATE

export function updateTransactionCategory(
  data: Prisma.TransactionWhereUniqueInput & {
    category?: number
  }
) {
  return ApiBase.put<TransactionWithCategory>(api.updateTransactionCategory.url, data).then(
    res => res.data
  )
}

export function useUpdateTransactionCategory() {
  const mutation = useMutation({
    mutationFn: updateTransactionCategory,
    onSuccess: () =>
      // TODO: why isn't query key invalidation not working for composed keys?
      api.updateTransactionCategory.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}

export function updateTransactionsCategory(
  data: (Prisma.TransactionWhereUniqueInput & {
    category?: number
  })[]
) {
  return ApiBase.put<TransactionWithCategory[]>(api.updateTransactionsCategory.url, data).then(
    res => res.data
  )
}

export function useUpdateTransactionsCategory() {
  const mutation = useMutation({
    mutationFn: updateTransactionsCategory,
    onSuccess: () =>
      api.updateTransactionsCategory.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}

// * DELETE

export function deleteTransaction(id: number) {
  return ApiBase.delete<Transaction>(api.deleteTransaction.url, { data: { id } }).then(
    res => res.data
  )
}

export function useDeleteTransaction() {
  const mutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () =>
      api.deleteTransaction.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}

export function deleteTransactions(ids: number[]) {
  return ApiBase.delete<Transaction[]>(api.deleteTransactions.url, { data: { ids } }).then(
    res => res.data
  )
}

export function useDeleteTransactions() {
  const mutation = useMutation({
    mutationFn: deleteTransactions,
    onSuccess: () =>
      api.deleteTransactions.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}
