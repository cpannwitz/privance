import { AutomationRuleWithCategory, TransactionBeforeUpload } from '../../types/types'
import { Category } from '@prisma/client'

function assignNewTransactionCategory(
  transactions: TransactionBeforeUpload[],
  rules: AutomationRuleWithCategory[]
) {
  const transformedTransactions: TransactionBeforeUpload[] = []

  transactions.forEach(transaction => {
    const categoriesToApply: Category[] = []

    rules.some(rule => {
      const result = applyRule(rule, transaction)
      if (result) {
        categoriesToApply.push(result)
        return true
      }
    })

    // take first category match
    transformedTransactions.push(forgeTransaction(transaction, categoriesToApply[0]))
  })
  return transformedTransactions
}

export default assignNewTransactionCategory

function applyRule(rule: AutomationRuleWithCategory, transaction: TransactionBeforeUpload) {
  const issuerMatch = transaction.issuer?.toLowerCase().includes(rule.value.toLowerCase())
  const purposeMatch = transaction.purpose?.toLowerCase().includes(rule.value.toLowerCase())

  if (issuerMatch || purposeMatch) return rule.category
  return undefined
}

function forgeTransaction(transaction: TransactionBeforeUpload, category: Category) {
  if (category) {
    return Object.assign({}, { ...transaction, category })
  }
  return transaction
}
