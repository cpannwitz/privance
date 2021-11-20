import { Divider, Navbar } from "@mantine/core"

import NavbarHeader from "./NavbarHeader"
import NavbarLinks from "./NavbarLinks"

const NavbarContent = ({}) => {
  return (
    <>
      <Navbar.Section mb="md">
        <NavbarHeader />
      </Navbar.Section>
      <Divider />
      <Navbar.Section mt="md">
        <NavbarLinks />
      </Navbar.Section>
    </>
  )
}

export default NavbarContent
