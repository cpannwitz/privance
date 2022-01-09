import { Center, VStack, Text, Button } from "@chakra-ui/react"

const DataIsError = ({ retry }: { retry: () => void }) => (
  <Center h="12rem">
    <VStack>
      <Text color="gray">Couldn&apos;t fetch your data. Please retry.</Text>
      <Button variant="outline" colorScheme="violet" size="sm" onClick={retry}>
        Reload
      </Button>
    </VStack>
  </Center>
)
export default DataIsError
