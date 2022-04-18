import {
  AutomationRuleWithCategory,
  TransactionBeforeUpload,
  ZAutomationRuleField,
} from "../../types/types"
import { Category } from ".prisma/client"

// TODO: centralize and deduplicate code

function assignNewTransactionCategory(
  transactions: TransactionBeforeUpload[],
  rules: AutomationRuleWithCategory[]
) {
  const transformedTransactions: TransactionBeforeUpload[] = []

  transactions.forEach(transaction => {
    const categoriesToApply: Category[] = []

    rules.forEach(rule => {
      const result = applyRule(rule, transaction)
      if (result) {
        categoriesToApply.push(result)
      }
    })

    // check for length of categories to apply, take first one
    if (categoriesToApply.length > 0) {
      const newCategory = categoriesToApply[0]
      const newTransaction = Object.assign({}, { ...transaction, category: newCategory })
      transformedTransactions.push(newTransaction)
    } else {
      transformedTransactions.push(transaction)
    }
  })
  return transformedTransactions
}

export default assignNewTransactionCategory

export function applyRule(rule: AutomationRuleWithCategory, transaction: TransactionBeforeUpload) {
  const fieldValue = transaction[rule.field as ZAutomationRuleField]
  switch (rule.operation) {
    case "includes": {
      if (
        fieldValue &&
        typeof fieldValue === "string" &&
        rule.stringValue &&
        fieldValue.toLowerCase().includes(rule.stringValue.toLowerCase())
      ) {
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
        return rule.category
      }
    }
    case "before": {
      if (
        fieldValue &&
        fieldValue instanceof Date &&
        fieldValue.getTime() &&
        rule.dateValue &&
        fieldValue.getTime() < new Date(rule.dateValue).getTime()
      ) {
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
        fieldValue.getTime() > new Date(rule.dateValue).getTime()
      ) {
        return rule.category
      }
    }
    default:
      return undefined
  }
}
