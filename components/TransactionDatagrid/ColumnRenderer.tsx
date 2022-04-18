import { GridRenderCellParams } from "@mui/x-data-grid"
import { Category } from "@prisma/client"

import getSymbolFromCurrency from "currency-map-symbol"

import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { TransactionWithCategory } from "../../types/types"
import CategorySelect from "../CategorySelect/CategorySelect"

interface CategoryRendererProps extends GridRenderCellParams<Category, TransactionWithCategory> {
  onUpdateTransaction?: (transaction: TransactionWithCategory) => void
}

export const CategoryEditRenderer = ({
  row,
  formattedValue: value,
  onUpdateTransaction,
}: CategoryRendererProps) => {
  function updateCategory(category: Category | null) {
    if (!onUpdateTransaction) return
    onUpdateTransaction({ ...row, category })
  }

  return <CategorySelect value={value} onChange={updateCategory} />
}

interface TextRendererProps extends GridRenderCellParams<string, TransactionWithCategory> {}

export const TextRenderer = ({ value, formattedValue }: TextRendererProps) => {
  return (
    <Tooltip arrow enterDelay={200} placement="bottom" title={formattedValue || value || ""}>
      <span>{formattedValue || value}</span>
    </Tooltip>
  )
}

interface AmountRendererProps extends GridRenderCellParams<number, TransactionWithCategory> {}

export const AmountRenderer = ({ value, row }: AmountRendererProps) => {
  if (!value) {
    return null
  }
  const currency = row.amountCurrency
  const color = value < 0 ? "error.main" : "success.main"
  return (
    <Typography fontWeight="bold" color={color}>
      {value.toFixed(2)}
      &nbsp;
      {getSymbolFromCurrency(currency)}
    </Typography>
  )
}

interface BalanceRendererProps extends GridRenderCellParams<number, TransactionWithCategory> {}

export const BalanceRenderer = ({ value, row }: BalanceRendererProps) => {
  if (!value) {
    return null
  }
  const currency = row.balanceCurrency
  const color = value < 0 ? "error.dark" : "grey.500"
  return (
    <Typography fontWeight="bold" color={color}>
      {value.toFixed(2)}
      &nbsp;
      {getSymbolFromCurrency(currency)}
    </Typography>
  )
}
