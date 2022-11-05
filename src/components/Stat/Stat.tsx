import Box from '@mui/material/Box'
import TrendUpIcon from '@mui/icons-material/TrendingUpOutlined'
import { ReactNode } from 'react'

interface StatProps {
  color?: string
  heading: string
  label: ReactNode
  sublabel: string
}

const Stat = ({ color = 'text.primary', heading = '', label = '', sublabel = '' }: StatProps) => {
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
        component={TrendUpIcon}
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
