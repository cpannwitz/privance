import { memo, PropsWithChildren } from "react"

import Typography from "@mui/material/Typography"

import { CellProps } from "react-table"
import { TransactionWithCategory } from "../../../types/types"
import getSymbolFromCurrency from "currency-map-symbol"

const colors = {
  amount: {
    negative: "error.light",
    positive: "success.light",
  },
  balance: {
    negative: "error.light",
    positive: "grey.500",
  },
}

interface NumberRendererProps
  extends PropsWithChildren<CellProps<TransactionWithCategory, number | null>> {
  variant: "amount" | "balance"
}

const NumberRenderer = memo(
  ({ value, variant = "amount", row: { original: data } }: NumberRendererProps) => {
    if (!value) {
      return null
    }
    const currency = variant === "amount" ? data.amountCurrency : data.balanceCurrency
    const positiveNegative = value < 0 ? "negative" : "positive"
    return (
      <Typography fontWeight="bold" color={colors[variant][positiveNegative]}>
        {value.toFixed(2)}
        &nbsp;
        {getSymbolFromCurrency(currency)}
      </Typography>
    )
  },
  (prev, post) => prev.value !== post.value
)
NumberRenderer.displayName = "NumberRenderer"
export default NumberRenderer
