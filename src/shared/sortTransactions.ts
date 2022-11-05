import { TransactionWithCategory } from '../types/types'

function sortTransactions(
  transactions: TransactionWithCategory[],
  sortDirection: 'asc' | 'desc' = 'desc'
) {
  const isDesc = sortDirection === 'desc'
  const sorted = [...transactions].sort((a, b) => {
    if (!a.issuedate || !b.issuedate) return 0

    const aDate = new Date(a.issuedate).getTime()
    const bDate = new Date(b.issuedate).getTime()

    if (aDate < bDate) return isDesc ? 1 : -1

    if (aDate > bDate) return isDesc ? -1 : 1

    if (aDate === bDate) {
      if (a.balance === null || a.amount === null || b.balance === null || b.amount === null) {
        return isDesc ? 1 : -1
      }
      if (a.balance + a.amount * -1 !== b.balance) {
        return isDesc ? 1 : -1
      }
      return isDesc ? -1 : 1
    }
    return 0
  })
  return sorted
}

export default sortTransactions
