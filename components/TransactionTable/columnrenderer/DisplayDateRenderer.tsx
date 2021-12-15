import { PropsWithChildren, memo } from "react"
import { CellProps } from "react-table"
import { TransactionWithCategories } from "../../../types/types"
import { Text } from "@chakra-ui/react"
import dayjs from "dayjs"

const DateRenderer = memo(
  ({ value }: PropsWithChildren<CellProps<TransactionWithCategories, Date | null>>) => (
    <Text whiteSpace="nowrap">{dayjs(value).format("D. MMM YYYY")}</Text>
  ),
  (prev, post) => prev.value !== post.value
)
DateRenderer.displayName = "DateRenderer"
export default DateRenderer
