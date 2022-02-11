import { useCallback, useMemo } from "react"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import HomeIcon from "@mui/icons-material/HomeOutlined"
import AllTimeInsightIcon from "@mui/icons-material/DateRangeOutlined"
import MonthlyInsightIcon from "@mui/icons-material/TodayOutlined"
import UploadIcon from "@mui/icons-material/CloudUpload"
import CategoriesIcon from "@mui/icons-material/CategoryOutlined"
import PlaygroundIcon from "@mui/icons-material/SportsBaseballOutlined"
import AutomationRuleIcon from "@mui/icons-material/MotionPhotosAutoOutlined"

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
        icon: <HomeIcon />,
        link: linkToOverview,
        label: `Overview`,
        isActive: router.pathname === routerLinks.OVERVIEW,
      },
      {
        icon: <AllTimeInsightIcon />,
        link: linkToAllTimeInsight,
        label: `All-Time Insight`,
        isActive: router.pathname === routerLinks.ALLTIMEINSIGHT,
      },
      {
        icon: <MonthlyInsightIcon />,
        link: linkToMonthlyInsight,
        label: `Monthly Insight`,
        isActive: router.pathname === routerLinks.MONTHLYINSIGHT,
      },
      {
        icon: <UploadIcon />,
        link: linkToUpload,
        label: `Upload`,
        isActive: router.pathname === routerLinks.UPLOAD,
      },
      {
        icon: <CategoriesIcon />,
        link: linkToCategories,
        label: `Categories`,
        isActive: router.pathname === routerLinks.CATEGORIES,
      },
      {
        icon: <AutomationRuleIcon />,
        link: linkToAutomationRules,
        label: `Automation Rules`,
        isActive: router.pathname === routerLinks.AUTOMATIONRULES,
      },
      {
        icon: <PlaygroundIcon />,
        link: linkToPlayground,
        label: `[DEV] Playground`,
        isActive: router.pathname === routerLinks.PLAYGROUND,
      },
    ],
    [
      router.pathname,
      linkToOverview,
      linkToAllTimeInsight,
      linkToMonthlyInsight,
      linkToUpload,
      linkToCategories,
      linkToAutomationRules,
      linkToPlayground,
    ]
  )

  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        {navbarLinks.map(nav => (
          <ListItem key={nav.label} button selected={nav.isActive} onClick={nav.link}>
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default NavbarLinks
