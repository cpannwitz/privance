import { Prisma, Transaction, Category, AutomationRule } from ".prisma/client"

export type TransactionWithCategories = Transaction & {
  categories: Category[]
  _count?: Prisma.TransactionCountOutputType
}

export type TransactionCreateInputWithCategories = Omit<
  Prisma.TransactionCreateInput,
  "categories"
> & {
  categories: Category[]
}

export type CategoryWithTransactions = Category & {
  transactions: Transaction[]
}

export type AutomationRuleWithCategories = AutomationRule & {
  categories: Category[]
}

export interface ParsedCSVTransactions {
  issuedate?: string
  __?: string
  issuer?: string
  type?: string
  purpose?: string
  balance?: string
  balanceCurrency?: string
  amount?: string
  amountCurrency?: string
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
export type TAutomationRuleOperation = typeof AutomationRuleField[number]
const AutomationRuleField = ["issuedate", "issuer", "type", "purpose", "balance", "amount"]
type TAutomationRuleField = typeof AutomationRuleField[number]

export type ZAutomationRuleField =
  | "issuedate"
  | "issuer"
  | "type"
  | "purpose"
  | "balance"
  | "amount"

export function isAutomationRuleOperation(field: unknown): field is TAutomationRuleOperation {
  return typeof field === "string" && AutomationRuleOperation.includes(field)
}
export function isAutomationRuleField(field: unknown): field is TAutomationRuleField {
  return typeof field === "string" && AutomationRuleField.includes(field)
}
