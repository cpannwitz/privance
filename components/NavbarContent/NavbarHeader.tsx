import { useCallback } from "react"
import { useRouter } from "next/router"

import { ActionIcon, Center, Group, Text, useMantineColorScheme } from "@mantine/core"
import { RiBarChartGroupedLine } from "@react-icons/all-files/ri/RiBarChartGroupedLine"
import { RiSunLine } from "@react-icons/all-files/ri/RiSunLine"
import { RiMoonClearLine } from "@react-icons/all-files/ri/RiMoonClearLine"

const NavbarHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  const toggle = useCallback(() => toggleColorScheme(), [toggleColorScheme])

  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  return (
    <Group position="apart" onClick={linkToOverview}>
      <Center inline>
        <RiBarChartGroupedLine size="2rem" color="royalblue" />
        <Text
          size="xl"
          weight="bold"
          variant="gradient"
          gradient={{
            from: "royalblue",
            to: "red",
            deg: 45,
          }}
        >
          Privance
        </Text>
      </Center>
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={toggle}
        title="Toggle color scheme"
      >
        {dark ? <RiSunLine /> : <RiMoonClearLine />}
      </ActionIcon>
    </Group>
  )
}

export default NavbarHeader
