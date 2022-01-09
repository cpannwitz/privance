import { useCallback, useMemo } from "react"
import { useRouter } from "next/router"

import HomeIcon from "remixicon-react/Home4LineIcon"
import AllTimeInsightIcon from "remixicon-react/CalendarLineIcon"
import MonthlyInsightIcon from "remixicon-react/Calendar2LineIcon"
import UploadIcon from "remixicon-react/Upload2LineIcon"
import CategoriesIcon from "remixicon-react/StackLineIcon"
import PlaygroundIcon from "remixicon-react/BasketballLineIcon"
import AutomationRuleIcon from "remixicon-react/Settings2LineIcon"

import { VStack, Button, Icon } from "@chakra-ui/react"
import { routerLinks } from "../../shared/config"

const NavbarLinks = () => {
  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(routerLinks.OVERVIEW), [router])
  const linkToAllTimeInsight = useCallback(() => router.push(routerLinks.ALLTIMEINSIGHT), [router])
  const linkToMonthlyInsight = useCallback(() => router.push(routerLinks.MONTHLYINSIGHT), [router])
  const linkToUpload = useCallback(() => router.push(routerLinks.UPLOAD), [router])
  const linkToCategories = useCallback(() => router.push(routerLinks.CATEGORIES), [router])
  const linkToAutomationRules = useCallback(
    () => router.push(routerLinks.AUTOMATIONRULES),
    [router]
  )
  const linkToPlayground = useCallback(() => router.push(routerLinks.PLAYGROUND), [router])

  const navbarLinks = useMemo(
    () => [
      {
        icon: HomeIcon,
        link: linkToOverview,
        label: `Overview`,
        isActive: router.pathname === routerLinks.OVERVIEW,
      },
      {
        icon: AllTimeInsightIcon,
        link: linkToAllTimeInsight,
        label: `All-Time Insight`,
        isActive: router.pathname === routerLinks.ALLTIMEINSIGHT,
      },
      {
        icon: MonthlyInsightIcon,
        link: linkToMonthlyInsight,
        label: `Monthly Insight`,
        isActive: router.pathname === routerLinks.MONTHLYINSIGHT,
      },
      {
        icon: UploadIcon,
        link: linkToUpload,
        label: `Upload`,
        isActive: router.pathname === routerLinks.UPLOAD,
      },
      {
        icon: CategoriesIcon,
        link: linkToCategories,
        label: `Categories`,
        isActive: router.pathname === routerLinks.CATEGORIES,
      },
      {
        icon: AutomationRuleIcon,
        link: linkToAutomationRules,
        label: `Automation Rules`,
        isActive: router.pathname === routerLinks.AUTOMATIONRULES,
      },
      {
        icon: PlaygroundIcon,
        link: linkToPlayground,
        label: `[DEV] Playground`,
        isActive: router.pathname === routerLinks.PLAYGROUND,
      },
    ],
    [router.pathname]
  )

  return (
    <VStack spacing={4} align="stretch" w="100%" py={3}>
      {navbarLinks.map(nav => (
        <Button
          key={nav.label}
          isFullWidth
          variant="ghost"
          colorScheme={nav.isActive ? "blue" : "gray"}
          justifyContent="start"
          leftIcon={<Icon as={nav.icon} boxSize={6} />}
          onClick={nav.link}
        >
          {nav.label}
        </Button>
      ))}
    </VStack>
  )
}

export default NavbarLinks
