import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import TrendUpIcon from '@mui/icons-material/TrendingUpOutlined'
import TrendDownIcon from '@mui/icons-material/TrendingDownOutlined'

interface StatProps {
  isPositive?: boolean
  heading: string
  label: ReactNode
  sublabel: string
}

const Stat = ({ isPositive = true, heading = '', label = '', sublabel = '' }: StatProps) => {
  const icon = isPositive ? TrendUpIcon : TrendDownIcon
  const color = isPositive ? 'success.main' : 'error.main'
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        flex: 1
      }}
    >
      <Box sx={{ color: 'text.secondary', fontSize: 16 }}>{heading}</Box>
      <Box
        sx={{
          color: color,
          fontSize: 24,
          fontWeight: 'medium'
        }}
      >
        {label}
      </Box>
      <Box
        component={icon}
        sx={{
          color: color,
          fontSize: 16,
          verticalAlign: 'sub',
          mr: 1
        }}
      />
      <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>{sublabel}</Box>
    </Box>
  )
}

export default Stat
