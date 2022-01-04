import { Prisma, Transaction, Category, AutomationRule } from ".prisma/client"

export type TransactionWithCategory = Transaction & {
  category: Category | null
  _count: Prisma.TransactionCountOutputType
}

export type TransactionCreateInputWithCategory = Omit<Prisma.TransactionCreateInput, "category"> & {
  category?: Category | null
}

export type AllTimeAggregations = {
  totalPlus: number
  totalMinus: number
  preBalance: number
  totalPlusPercentage: number
  totalMinusPercentage: number
  currency: string
  startDate: Date
  endDate: Date
  transactions: TransactionWithCategory[]
  categories: (CategoryWithTransactions & {
    transactionBalance: number
  })[]
}

export type MonthlyAggregations = {
  currency: string
  years: {
    [key: number | string]: {
      year: number
      totalYearPlus: number
      totalYearMinus: number
      months: {
        [key: number | string]: {
          month: number
          totalMonthPlus: number
          totalMonthMinus: number
          totalMonthPlusPercentage: number
          totalMonthMinusPercentage: number
          transactions: TransactionWithCategory[]
          categories: (CategoryWithTransactions & {
            transactionBalance: number
          })[]
        }
      }
    }
  }
}

export type CategoryWithTransactions = Category & {
  transactions: Transaction[]
  _count: Prisma.CategoryCountOutputType
}

export type CategoriesStatistics = {
  uncategorizedTransactionsCount: number
  allTransactionsCount: number
}

export type AutomationRuleWithCategory = AutomationRule & {
  category: Category
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
