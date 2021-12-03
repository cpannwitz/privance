import { useCallback } from "react"
import { useRouter } from "next/router"

import { useColorMode, Icon, IconButton, Spacer, HStack, Text } from "@chakra-ui/react"

import BarChartIcon from "remixicon-react/BarChartGroupedLineIcon"
import SunIcon from "remixicon-react/SunLineIcon"
import MoonIcon from "remixicon-react/MoonClearLineIcon"

const NavbarHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dark = colorMode === "dark"

  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  return (
    <HStack w="100%">
      <HStack onClick={linkToOverview}>
        <Icon as={BarChartIcon} w={8} h={8} color="royalblue" />
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
        icon={dark ? <Icon as={SunIcon} /> : <Icon as={MoonIcon} />}
      />
    </HStack>
  )
}

export default NavbarHeader
