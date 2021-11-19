import { AccountChange, Category } from ".prisma/client"

export type AccountChangeWithCategories = AccountChange & {
  categories: Category[]
}
