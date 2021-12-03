import { Transaction, Category } from ".prisma/client"

export type TransactionWithCategories = Transaction & {
  categories: Category[]
}

export type CategoryWithTransactions = Category & {
  transactions: Transaction[]
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
