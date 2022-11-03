import type { TransactionBeforeUpload } from '../types/types'

function createTransactionIdentifier(transaction: Partial<TransactionBeforeUpload>) {
  return (
    (new Date(transaction.issuedate!)?.getTime() || 0) +
    (transaction.balance! || 0) +
    (transaction.amount! || 0)
  )
}

export default createTransactionIdentifier
