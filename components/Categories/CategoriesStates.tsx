import { Center, Spinner, VStack, Text, Button } from "@chakra-ui/react"

export const DataIsLoading = () => (
  <Center h="12rem">
    <Spinner thickness="4px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Center>
)

export const DataIsEmpty = () => {
  return (
    <Center h="12rem">
      <VStack>
        <Text color="gray.600">You currently have no categories. Please add some first.</Text>
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
