import {
  AutomationRuleWithCategories,
  TransactionWithCategories,
  ZAutomationRuleField,
} from "../../types/types"
import { Prisma, Category } from ".prisma/client"

function assignTransactionCategories(
  transactions: TransactionWithCategories[],
  rules: AutomationRuleWithCategories[],
  fullTransform: boolean = false
) {
  const transformedTransactions: TransactionWithCategories[] = []
  const untouchedTransactions: TransactionWithCategories[] = []
  const allTransactions: TransactionWithCategories[] = []

  transactions.forEach(transaction => {
    const categoriesToApply: Category[] = []

    rules.forEach(rule => {
      const result = applyRule(rule, transaction)
      categoriesToApply.push(...result)
    })

    if (fullTransform || categoriesToApply.length > 0) {
      transaction.categories = [
        ...Array.from(new Map(categoriesToApply.map(c => [c.id, c])).values()),
      ]
      transformedTransactions.push(transaction)
    } else {
      untouchedTransactions.push(transaction)
    }
    allTransactions.push(transaction)
  })
  return {
    transformedTransactions,
    untouchedTransactions,
    allTransactions,
  }
}

export default assignTransactionCategories

export function isWithCategories(
  transaction: TransactionWithCategories | Prisma.TransactionUncheckedCreateInput
): transaction is TransactionWithCategories {
  return (
    (transaction as TransactionWithCategories).categories !== undefined &&
    (transaction as TransactionWithCategories).categories.length > 0
  )
}

export function applyRule(
  rule: AutomationRuleWithCategories,
  transaction: TransactionWithCategories | Prisma.TransactionUncheckedCreateInput
) {
  const fieldValue = transaction[rule.field as ZAutomationRuleField]
  switch (rule.operation) {
    case "includes": {
      if (
        fieldValue &&
        typeof fieldValue === "string" &&
        rule.stringValue &&
        fieldValue.toLowerCase().includes(rule.stringValue.toLowerCase())
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "excludes": {
      if (
        fieldValue &&
        typeof fieldValue === "string" &&
        rule.stringValue &&
        !fieldValue.toLowerCase().includes(rule.stringValue.toLowerCase())
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "equal": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue === rule.numberValue
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "lessthan": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue < rule.numberValue
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "morethan": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue > rule.numberValue
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      }
    }
    case "before": {
      if (
        fieldValue &&
        fieldValue instanceof Date &&
        fieldValue.getTime() &&
        rule.dateValue &&
        fieldValue.getTime() < rule.dateValue.getTime()
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "after": {
      if (
        fieldValue &&
        fieldValue instanceof Date &&
        fieldValue.getTime() &&
        rule.dateValue &&
        fieldValue.getTime() > rule.dateValue.getTime()
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      }
    }
    default:
      return []
  }
}
