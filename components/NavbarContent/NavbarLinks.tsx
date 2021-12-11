import { useCallback } from "react"
import { useRouter } from "next/router"

import HomeIcon from "remixicon-react/Home4LineIcon"
import UploadIcon from "remixicon-react/Upload2LineIcon"
import TagIcon from "remixicon-react/PriceTag3LineIcon"
import PlaygroundIcon from "remixicon-react/BasketballLineIcon"
import AutomationRuleIcon from "remixicon-react/Settings2LineIcon"
import PlayIcon from "remixicon-react/PlayLineIcon"

import { VStack, Button, Icon } from "@chakra-ui/react"

const NavbarLinks = () => {
  const router = useRouter()
  const linkToOverview = useCallback(() => router.push(`/overview`), [router])
  const linkToUpload = useCallback(() => router.push(`/upload`), [router])
  const linkToCategories = useCallback(() => router.push(`/categories`), [router])
  const linkToAutomationRules = useCallback(() => router.push(`/automationrules`), [router])
  const linkToAutomationRuleApply = useCallback(() => router.push(`/automationruleapply`), [router])
  const linkToPlayground = useCallback(() => router.push(`/playground`), [router])
  return (
    <VStack spacing={4} align="stretch" w="100%" py={3}>
      <Button
        isFullWidth
        variant="ghost"
        colorScheme="gray"
        justifyContent="start"
        leftIcon={<Icon as={HomeIcon} boxSize={6} />}
        onClick={linkToOverview}
      >
        Overview
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="gray"
        justifyContent="start"
        leftIcon={<Icon as={UploadIcon} boxSize={6} />}
        onClick={linkToUpload}
      >
        Upload
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="gray"
        justifyContent="start"
        leftIcon={<Icon as={TagIcon} boxSize={6} />}
        onClick={linkToCategories}
      >
        Categories
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="gray"
        justifyContent="start"
        leftIcon={<Icon as={AutomationRuleIcon} boxSize={6} />}
        onClick={linkToAutomationRules}
      >
        Automation Rules
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="gray"
        justifyContent="start"
        leftIcon={<Icon as={PlayIcon} boxSize={6} />}
        onClick={linkToAutomationRuleApply}
      >
        [DEV] Automation Rules Apply
      </Button>

      <Button
        isFullWidth
        variant="ghost"
        colorScheme="gray"
        justifyContent="start"
        leftIcon={<Icon as={PlaygroundIcon} boxSize={6} />}
        onClick={linkToPlayground}
      >
        [DEV] Playground
      </Button>
    </VStack>
  )
}

export default NavbarLinks
