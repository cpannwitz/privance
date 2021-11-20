import { AppShell, Navbar } from "@mantine/core"

import NavbarContent from "../NavbarContent/NavbarContent"

interface BaseLayoutProps {
  children?: React.ReactNode
}
export default function Layout({ children }: BaseLayoutProps) {
  return (
    <AppShell
      navbar={
        <Navbar padding="md">
          <NavbarContent />
        </Navbar>
      }
      padding="xs"
    >
      {children}
    </AppShell>
  )
}
