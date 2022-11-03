import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/HomeOutlined';
import AllTimeInsightIcon from '@mui/icons-material/DateRangeOutlined';
import MonthlyInsightIcon from '@mui/icons-material/TodayOutlined';
import UploadIcon from '@mui/icons-material/CloudUpload';
import CategoriesIcon from '@mui/icons-material/CategoryOutlined';
import AutomationRuleIcon from '@mui/icons-material/MotionPhotosAutoOutlined';

import routerLinks from '../../shared/routerLinks';

const NavbarLinks = () => {
  const router = useRouter();
  const linkToOverview = useCallback(() => router.push(routerLinks.OVERVIEW), [router]);
  const linkToAllTimeInsight = useCallback(() => router.push(routerLinks.ALLTIMEINSIGHT), [router]);
  const linkToMonthlyInsight = useCallback(() => router.push(routerLinks.MONTHLYINSIGHT), [router]);
  const linkToUpload = useCallback(() => router.push(routerLinks.UPLOAD), [router]);
  const linkToCategories = useCallback(() => router.push(routerLinks.CATEGORIES), [router]);
  const linkToAutomationRules = useCallback(
    () => router.push(routerLinks.AUTOMATIONRULES),
    [router]
  );

  const navbarLinks = useMemo(
    () => [
      {
        icon: <HomeIcon />,
        link: linkToOverview,
        label: `Overview`,
        isActive: router.pathname === routerLinks.OVERVIEW
      },
      {
        icon: <AllTimeInsightIcon />,
        link: linkToAllTimeInsight,
        label: `All-Time Insight`,
        isActive: router.pathname === routerLinks.ALLTIMEINSIGHT
      },
      {
        icon: <MonthlyInsightIcon />,
        link: linkToMonthlyInsight,
        label: `Monthly Insight`,
        isActive: router.pathname === routerLinks.MONTHLYINSIGHT
      },
      {
        icon: <UploadIcon />,
        link: linkToUpload,
        label: `Upload`,
        isActive: router.pathname === routerLinks.UPLOAD
      },
      {
        icon: <CategoriesIcon />,
        link: linkToCategories,
        label: `Categories`,
        isActive: router.pathname === routerLinks.CATEGORIES
      },
      {
        icon: <AutomationRuleIcon />,
        link: linkToAutomationRules,
        label: `Automation Rules`,
        isActive: router.pathname === routerLinks.AUTOMATIONRULES
      }
    ],
    [
      router.pathname,
      linkToOverview,
      linkToAllTimeInsight,
      linkToMonthlyInsight,
      linkToUpload,
      linkToCategories,
      linkToAutomationRules
    ]
  );

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {navbarLinks.map(nav => (
          <ListItem key={nav.label} button selected={nav.isActive} onClick={nav.link}>
            <ListItemIcon>{nav.icon}</ListItemIcon>
            <ListItemText primary={nav.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavbarLinks;
