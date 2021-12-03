import { Text, Tooltip } from "@chakra-ui/react"
import { memo, PropsWithChildren } from "react"
import { CellProps } from "react-table"
import { TransactionWithCategories } from "../../../types/types"

interface TextRendererProps
  extends PropsWithChildren<CellProps<TransactionWithCategories, string | null>> {}

const TextRenderer = memo(
  ({ value }: TextRendererProps) => (
    <Tooltip hasArrow openDelay={200} placement="bottom" label={value}>
      <Text noOfLines={1}>{value}</Text>
    </Tooltip>
  ),
  (prev, post) => prev.value !== post.value
)
TextRenderer.displayName = "TextRenderer"
export default TextRenderer
