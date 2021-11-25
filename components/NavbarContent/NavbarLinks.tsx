import { useCallback } from "react"
import { useRouter } from "next/router"

import { RiHomeLine } from "@react-icons/all-files/ri/RiHomeLine"
import { RiUpload2Line } from "@react-icons/all-files/ri/RiUpload2Line"
import { TiTags } from "@react-icons/all-files/ti/TiTags"
import { VStack, Button, Icon } from "@chakra-ui/react"

const NavbarLinks = () => {
  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  const linkToUpload = useCallback(() => router.push(`/upload`), [router])
  const linkToCategories = useCallback(() => router.push(`/categories`), [router])
  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Button
        isFullWidth
        variant="ghost"
        colorScheme="blue"
        leftIcon={<Icon as={RiHomeLine} />}
        onClick={linkToOverview}
      >
        Overview
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="red"
        leftIcon={<Icon as={RiUpload2Line} />}
        onClick={linkToUpload}
      >
        Upload
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="green"
        leftIcon={<Icon as={TiTags} />}
        onClick={linkToCategories}
      >
        Categories
      </Button>
    </VStack>
  )
}

export default NavbarLinks
