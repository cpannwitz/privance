import { PropsWithChildren, memo } from "react"

import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import { CellProps } from "react-table"
import dayjs from "dayjs"

import { TransactionWithCategory } from "../../../types/types"

const DateRenderer = memo(
  ({ value }: PropsWithChildren<CellProps<TransactionWithCategory, Date | null>>) => {
    const dateValue = dayjs(value).format("D. MMM YYYY")
    return (
      <Tooltip arrow enterDelay={200} placement="bottom" title={dateValue}>
        <Typography noWrap>{dateValue}</Typography>
      </Tooltip>
    )
  },
  (prev, post) => prev.value !== post.value
)
DateRenderer.displayName = "DateRenderer"
export default DateRenderer
