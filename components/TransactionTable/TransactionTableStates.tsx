import { Center, Spinner, VStack, Text, Button } from "@chakra-ui/react"
import { useCallback } from "react"
import { useRouter } from "next/router"

export const DataIsLoading = () => (
  <Center h="12rem">
    <Spinner thickness="4px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Center>
)

export const DataIsEmpty = () => {
  const router = useRouter()
  const linkToUpload = useCallback(() => router.push(`/upload`), [router])
  return (
    <Center h="12rem">
      <VStack>
        <Text color="gray.600">You currently have no data. Please add some first.</Text>
        <Button variant="outline" colorScheme="violet" size="sm" onClick={linkToUpload}>
          Add some data
        </Button>
      </VStack>
    </Center>
  )
}

export const DataIsError = ({ retry }: any) => (
  <Center h="12rem">
    <VStack>
      <Text color="gray">Couldn&apos;t fetch your data. Please retry.</Text>
      <Button variant="outline" colorScheme="violet" size="sm" onClick={retry}>
        Reload
      </Button>
    </VStack>
  </Center>
)
