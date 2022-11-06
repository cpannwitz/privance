import { Method } from 'axios'
import { TransactionWithCategory } from '../types/types'

export const apiDir = {
  transactions: {
    getTransactions: {
      method: 'GET' as Method,
      type: [] as unknown as TransactionWithCategory[],
      url: '/api/transactions/getTransactions'
    },
    addTransactions: {},
    deleteTransaction: {},
    deleteTransactions: {},
    updateTransactionCategory: {},
    updateTransactionsCategory: {
      method: 'POST' as Method,
      // input: , // TODO
      type: [] as unknown as TransactionWithCategory[],
      url: '/api/transactions/updateTransactionsCategory'
    }
  }
}
