import { useCallback } from "react"
import { useRouter } from "next/router"

import { Group, Button } from "@mantine/core"
import { RiHomeLine } from "@react-icons/all-files/ri/RiHomeLine"
import { RiUpload2Line } from "@react-icons/all-files/ri/RiUpload2Line"

const NavbarLinks = () => {
  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  const linkToUpload = useCallback(() => router.push(`/upload`), [router])
  return (
    <Group direction="column" grow>
      <Button variant="light" leftIcon={<RiHomeLine />} onClick={linkToOverview} loading={false}>
        Overview
      </Button>

      <Button variant="light" leftIcon={<RiUpload2Line />} onClick={linkToUpload}>
        Upload
      </Button>
    </Group>
  )
}

export default NavbarLinks
