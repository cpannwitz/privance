import { useCallback } from "react"
import { useRouter } from "next/router"

import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

import BarChartIcon from "@mui/icons-material/BarChart"

const NavbarHeader = () => {
  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Link component="button" onClick={linkToOverview} underline="none">
        <Stack direction="row" alignItems="center" padding="0.5rem">
          <BarChartIcon color="info" sx={{ fontSize: "3rem" }} />
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(to top right, royalblue, red)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Privance
          </Typography>
        </Stack>
      </Link>
    </Box>
  )
}

export default NavbarHeader
