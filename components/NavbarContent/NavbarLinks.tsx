import { useCallback } from "react"
import { useRouter } from "next/router"

import HomeIcon from "remixicon-react/Home4LineIcon"
import UploadIcon from "remixicon-react/Upload2LineIcon"
import TagIcon from "remixicon-react/PriceTag3LineIcon"

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
        leftIcon={<Icon as={HomeIcon} w={6} h={6} />}
        onClick={linkToOverview}
      >
        Overview
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="red"
        leftIcon={<Icon as={UploadIcon} w={6} h={6} />}
        onClick={linkToUpload}
      >
        Upload
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="green"
        leftIcon={<Icon as={TagIcon} w={6} h={6} />}
        onClick={linkToCategories}
      >
        Categories
      </Button>
    </VStack>
  )
}

export default NavbarLinks
