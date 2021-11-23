import { VStack, StackDivider } from "@chakra-ui/react"

import NavbarHeader from "./NavbarHeader"
import NavbarLinks from "./NavbarLinks"

const NavbarContent = ({}) => {
  return (
    <VStack
      w="18rem"
      pos="fixed"
      top={0}
      left={0}
      h="100vh"
      p={3}
      shadow="base"
      divider={<StackDivider borderColor="gray.200" />}
    >
      <NavbarHeader />
      <NavbarLinks />
    </VStack>
  )
}

export default NavbarContent
