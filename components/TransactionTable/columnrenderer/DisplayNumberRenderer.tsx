import { Text } from "@chakra-ui/react"
import { memo, PropsWithChildren } from "react"
import { CellProps } from "react-table"
import { TransactionWithCategory } from "../../../types/types"
import getSymbolFromCurrency from "currency-map-symbol"

const colors = {
  amount: {
    negative: "crimson",
    positive: "limegreen",
  },
  balance: {
    negative: "coral",
    positive: "gray.600",
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
      <Text fontWeight="bold" color={colors[variant][positiveNegative]}>
        {value.toFixed(2)}
        &nbsp;
        {getSymbolFromCurrency(currency)}
      </Text>
    )
  },
  (prev, post) => prev.value !== post.value
)
NumberRenderer.displayName = "NumberRenderer"
export default NumberRenderer
