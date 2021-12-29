import { CellProps } from "react-table"

import { memo, PropsWithChildren } from "react"
import { Category } from ".prisma/client"
import { TransactionWithCategory } from "../../../types/types"
import CategorySelect from "../../CategorySelect/CategorySelect"

// https://react-select.com/components

interface CategoryRendererProps
  extends PropsWithChildren<CellProps<TransactionWithCategory, Category | null>> {
  categories: Category[]
  onSelectCategory?: (transaction: TransactionWithCategory) => void
}

const CategoryRenderer = memo(
  ({ row, value, categories, onSelectCategory = () => {} }: CategoryRendererProps) => {
    function onChangeSelect(category: Category | null) {
      onSelectCategory({ ...row.original, category: category })
    }

    return <CategorySelect categories={categories} value={value} onChange={onChangeSelect} />
  },
  (prev, post) => prev.value !== post.value
)
CategoryRenderer.displayName = "CategoryRenderer"
export default CategoryRenderer
