import { Center, VStack, Text, Button } from "@chakra-ui/react"
import { useCallback } from "react"
import { useRouter } from "next/router"

const DataIsEmpty = ({ linkUrl }: { linkUrl?: string }) => {
  const router = useRouter()
  const linkToUpload = useCallback(() => router.push(linkUrl || ""), [router])
  return (
    <Center h="12rem">
      <VStack>
        <Text color="gray.600">You currently have no data. Please add some first.</Text>
        {linkUrl ? (
          <Button variant="outline" colorScheme="violet" size="sm" onClick={linkToUpload}>
            Add some data
          </Button>
        ) : null}
      </VStack>
    </Center>
  )
}

export default DataIsEmpty
