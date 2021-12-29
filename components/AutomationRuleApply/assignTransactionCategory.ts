import {
  AutomationRuleWithCategory,
  TransactionWithCategory,
  ZAutomationRuleField,
} from "../../types/types"
import { Prisma, Category } from ".prisma/client"

function assignTransactionCategory(
  transactions: TransactionWithCategory[],
  rules: AutomationRuleWithCategory[],
  fullTransform: boolean = false
) {
  const transformedTransactions: TransactionWithCategory[] = []
  const untouchedTransactions: TransactionWithCategory[] = []
  const allTransactions: TransactionWithCategory[] = []

  transactions.forEach(transaction => {
    const categoriesToApply: Category[] = []

    rules.forEach(rule => {
      const result = applyRule(rule, transaction)
      if (result) {
        categoriesToApply.push(result)
      }
    })
    if (fullTransform || categoriesToApply.length > 0) {
      transaction.category = categoriesToApply[0]
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

export default assignTransactionCategory

export function isWithCategory(
  transaction: TransactionWithCategory | Prisma.TransactionUncheckedCreateInput
): transaction is TransactionWithCategory {
  return (
    (transaction as TransactionWithCategory).category !== undefined &&
    (transaction as TransactionWithCategory).category !== null
  )
}

export function applyRule(
  rule: AutomationRuleWithCategory,
  transaction: TransactionWithCategory | Prisma.TransactionUncheckedCreateInput
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
        if (isWithCategory(transaction)) {
          return undefined
        }
        return rule.category
      } else {
        return undefined
      }
    }
    case "excludes": {
      if (
        fieldValue &&
        typeof fieldValue === "string" &&
        rule.stringValue &&
        !fieldValue.toLowerCase().includes(rule.stringValue.toLowerCase())
      ) {
        if (isWithCategory(transaction)) {
          return undefined
        }
        return rule.category
      } else {
        return undefined
      }
    }
    case "equal": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue === rule.numberValue
      ) {
        if (isWithCategory(transaction)) {
          return undefined
        }
        return rule.category
      } else {
        return undefined
      }
    }
    case "lessthan": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue < rule.numberValue
      ) {
        if (isWithCategory(transaction)) {
          return undefined
        }
        return rule.category
      } else {
        return undefined
      }
    }
    case "morethan": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue > rule.numberValue
      ) {
        if (isWithCategory(transaction)) {
          return undefined
        }
        return rule.category
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
        if (isWithCategory(transaction)) {
          return undefined
        }
        return rule.category
      } else {
        return undefined
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
        if (isWithCategory(transaction)) {
          return undefined
        }
        return rule.category
      }
    }
    default:
      return undefined
  }
}
