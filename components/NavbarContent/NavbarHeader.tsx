import { useCallback } from "react"
import { useRouter } from "next/router"

import { useColorMode, Icon, IconButton, Spacer, HStack, Text } from "@chakra-ui/react"

import { RiBarChartGroupedLine } from "@react-icons/all-files/ri/RiBarChartGroupedLine"
import { RiSunLine } from "@react-icons/all-files/ri/RiSunLine"
import { RiMoonClearLine } from "@react-icons/all-files/ri/RiMoonClearLine"

const NavbarHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dark = colorMode === "dark"

  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  return (
    <HStack w="100%">
      <HStack onClick={linkToOverview}>
        <Icon as={RiBarChartGroupedLine} w={8} h={8} color="royalblue" />
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          bgGradient="linear(to-tr, royalblue, red)"
          bgClip="text"
        >
          Privance
        </Text>
      </HStack>
      <Spacer />
      <IconButton
        variant="ghost"
        colorScheme={dark ? "orange" : "blue"}
        onClick={toggleColorMode}
        aria-label="toggle darkmode"
        icon={dark ? <RiSunLine /> : <RiMoonClearLine />}
      />
    </HStack>
  )
}

export default NavbarHeader
