import { Center, Spinner } from "@chakra-ui/react"

const DataIsLoading = () => (
  <Center h="12rem">
    <Spinner thickness="4px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Center>
)

export default DataIsLoading
