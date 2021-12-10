import { Transaction, Category } from ".prisma/client"

export type TransactionWithCategories = Transaction & {
  categories: Category[]
  _count?: Prisma.TransactionCountOutputType
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

export type TransactionRuleFields = Partial<
  Omit<
    TransactionWithCategories,
    "id" | "createdAt" | "updatedAt" | "identifier" | "_count" | "categories"
  >
>

export interface AutomationRule {
  field: keyof TransactionRuleFields
  operation: "includes" | "excludes" | "lessthan" | "equal" | "morethan" | "before" | "after"
  numberValue?: number
  stringValue?: string
  dateValue?: Date
  categories: Category[]
}
