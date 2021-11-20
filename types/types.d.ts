import { Transaction, Category } from ".prisma/client"

export type TransactionWithCategories = Transaction & {
  categories: Category[]
}
