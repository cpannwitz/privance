import {
  AutomationRuleWithCategories,
  TransactionCreateInputWithCategories,
  ZAutomationRuleField,
} from "../../types/types"
import { Prisma, Category } from ".prisma/client"

// TODO: centralize and deduplicate code

function assignNewTransactionCategories(
  transactions: Prisma.TransactionUncheckedCreateInput[],
  rules: AutomationRuleWithCategories[]
) {
  const transformedTransactions: TransactionCreateInputWithCategories[] = []

  transactions.forEach(transaction => {
    const categoriesToApply: Category[] = []

    rules.forEach(rule => {
      const result = applyRule(rule, transaction)
      categoriesToApply.push(...result)
    })

    const newCategories = [...Array.from(new Map(categoriesToApply.map(c => [c.id, c])).values())]
    const newTransaction = Object.assign({}, { ...transaction, categories: newCategories })
    transformedTransactions.push(newTransaction)
  })
  return transformedTransactions
}

export default assignNewTransactionCategories

export function applyRule(
  rule: AutomationRuleWithCategories,
  transaction: Prisma.TransactionUncheckedCreateInput
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
        return rule.categories
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
        fieldValue.getTime() > new Date(rule.dateValue).getTime()
      ) {
        return rule.categories
      }
    }
    default:
      return []
  }
}
