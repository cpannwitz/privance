import { memo, PropsWithChildren } from "react"

import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import { CellProps } from "react-table"
import { TransactionWithCategory } from "../../../types/types"

interface TextRendererProps
  extends PropsWithChildren<CellProps<TransactionWithCategory, string | null>> {}

const TextRenderer = memo(
  ({ value }: TextRendererProps) => (
    <Tooltip arrow enterDelay={200} placement="bottom" title={value || ""}>
      <Typography noWrap>{value}</Typography>
    </Tooltip>
  ),
  (prev, post) => prev.value !== post.value
)
TextRenderer.displayName = "TextRenderer"
export default TextRenderer
