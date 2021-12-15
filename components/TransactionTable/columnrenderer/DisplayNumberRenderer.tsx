import { Text } from "@chakra-ui/react"
import { memo, PropsWithChildren } from "react"
import { CellProps } from "react-table"
import { TransactionWithCategories } from "../../../types/types"

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
  extends PropsWithChildren<CellProps<TransactionWithCategories, number | null>> {
  variant: "amount" | "balance"
}

const NumberRenderer = memo(
  ({ value, variant = "amount" }: NumberRendererProps) => {
    if (!value) {
      return null
    }
    if (value < 0) {
      return (
        <Text fontWeight="bold" color={colors[variant].negative}>
          {value.toFixed(2)}
        </Text>
      )
    }
    return (
      <Text fontWeight="bold" color={colors[variant].positive}>
        {value.toFixed(2)}
      </Text>
    )
  },
  (prev, post) => prev.value !== post.value
)
NumberRenderer.displayName = "NumberRenderer"
export default NumberRenderer
