import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import NavbarHeader from '../NavbarContent/NavbarHeader';
import NavbarLinks from '../NavbarContent/NavbarLinks';

const DRAWER_WIDTH = '18rem';

interface BaseLayoutProps {
  children?: React.ReactNode;
}
export default function Layout({ children }: BaseLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box' }
        }}
      >
        <NavbarHeader />
        <Box sx={{ overflow: 'auto' }}>
          <NavbarLinks />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 2, height: '100vh' }}>
        {children}
      </Box>
    </Box>
  );
}
