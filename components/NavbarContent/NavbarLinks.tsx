import { useCallback } from "react"
import { useRouter } from "next/router"

import { RiHomeLine } from "@react-icons/all-files/ri/RiHomeLine"
import { RiUpload2Line } from "@react-icons/all-files/ri/RiUpload2Line"
import { VStack, Button } from "@chakra-ui/react"

const NavbarLinks = () => {
  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  const linkToUpload = useCallback(() => router.push(`/upload`), [router])
  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Button
        isFullWidth
        variant="ghost"
        colorScheme="blue"
        leftIcon={<RiHomeLine />}
        onClick={linkToOverview}
      >
        Overview
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="red"
        leftIcon={<RiUpload2Line />}
        onClick={linkToUpload}
      >
        Upload
      </Button>
    </VStack>
  )
}

export default NavbarLinks
