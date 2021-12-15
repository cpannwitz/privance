import { BoxProps, Box, useStyleConfig } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

interface GeneralBadgeProps extends BoxProps {}

const GeneralBadge = ({ children, ...boxProps }: PropsWithChildren<GeneralBadgeProps>) => {
  const dropzoneStyles = useStyleConfig("GeneralBadge")
  return (
    <Box __css={dropzoneStyles} {...boxProps}>
      {children}
    </Box>
  )
}

export default GeneralBadge
