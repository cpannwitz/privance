import Box, { BoxProps } from '@mui/material/Box'

const Center = ({ children, sx }: BoxProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...sx }}>
      {children}
    </Box>
  )
}

export default Center
