import { MultiValue } from "react-select"
import { CellProps } from "react-table"

import { memo, PropsWithChildren } from "react"
import { Category } from ".prisma/client"
import { TransactionWithCategories } from "../../../types/types"
import CategorySelect from "../../CategorySelect/CategorySelect"

// https://react-select.com/components

interface CategoryRendererProps
  extends PropsWithChildren<CellProps<TransactionWithCategories, Category[]>> {
  categories: Category[]
  onSelectCategories?: (transaction: TransactionWithCategories) => void
}

const CategoryRenderer = memo(
  ({ row, value, categories, onSelectCategories = () => {} }: CategoryRendererProps) => {
    function onChangeSelect(val: MultiValue<Category>) {
      onSelectCategories({ ...row.original, categories: val.map(val => val) })
    }

    return <CategorySelect categories={categories} value={value} onChange={onChangeSelect} />
  },
  (prev, post) => prev.value !== post.value
)
CategoryRenderer.displayName = "CategoryRenderer"
export default CategoryRenderer
