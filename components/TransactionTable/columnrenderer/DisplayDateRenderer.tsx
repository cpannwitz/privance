import { PropsWithChildren, memo } from "react"
import { CellProps } from "react-table"
import { TransactionWithCategories } from "../../../types/types"
import { Text, Tooltip } from "@chakra-ui/react"
import dayjs from "dayjs"

const DateRenderer = memo(
  ({ value }: PropsWithChildren<CellProps<TransactionWithCategories, Date | null>>) => {
    const dateValue = dayjs(value).format("D. MMM YYYY")
    return (
      <Tooltip hasArrow openDelay={200} placement="bottom" label={dateValue}>
        <Text noOfLines={1}>{dateValue}</Text>
      </Tooltip>
    )
  },
  (prev, post) => prev.value !== post.value
)
DateRenderer.displayName = "DateRenderer"
export default DateRenderer
