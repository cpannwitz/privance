import type { Prisma, Transaction, Category, AutomationRule } from '@prisma/client'

export type TransactionWithCategory = Transaction & {
  category: Category | null
}

export type TransactionBeforeUpload = Omit<
  Prisma.TransactionCreateInput,
  'category' | 'identifier'
> & {
  category?: Category | null
  identifier?: number | null
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

export type CategoryWithAutomationRules = Category & {
  automationRules: AutomationRuleWithCategory[]
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
