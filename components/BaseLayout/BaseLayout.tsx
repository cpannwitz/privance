import { Box } from "@chakra-ui/react"

import NavbarContent from "../NavbarContent/NavbarContent"

interface BaseLayoutProps {
  children?: React.ReactNode
}
export default function Layout({ children }: BaseLayoutProps) {
  return (
    <Box w="100%" pos="relative">
      <NavbarContent />

      <Box p={5} ml="18rem">
        {children}
      </Box>
    </Box>
  )
}
