import { Transaction, Category, AutomationRule } from ".prisma/client"

export type TransactionWithCategories = Transaction & {
  categories: Category[]
  _count?: Prisma.TransactionCountOutputType
}

export type CategoryWithTransactions = Category & {
  transactions: Transaction[]
}

export type AutomationRuleWithCategories = AutomationRule & {
  categories: Category[]
}

export interface ParsedCSVValues {
  issuedate?: string
  __?: string
  issuer?: string
  type?: string
  purpose?: string
  balance?: string
  amount?: string
  currency?: string
}

// TODO: replace this with runtypes later
const AutomationRuleOperation = [
  "includes",
  "excludes",
  "lessthan",
  "equal",
  "morethan",
  "before",
  "after",
]
type TAutomationRuleOperation = typeof AutomationRuleField[number]
const AutomationRuleField = [
  "issuedate",
  "issuer",
  "type",
  "purpose",
  "balance",
  "amount",
  "currency",
]
type TAutomationRuleField = typeof AutomationRuleField[number]

export function isAutomationRuleOperation(field: unknown): field is TAutomationRuleOperation {
  return typeof field === "string" && AutomationRuleOperation.includes(field)
}
export function isAutomationRuleField(field: unknown): field is TAutomationRuleField {
  return typeof field === "string" && AutomationRuleField.includes(field)
}
