import { Prisma } from ".prisma/client"

import Datatable from "../Datatable/Datatable"
import { Box, HStack, Divider, Button, Icon } from "@chakra-ui/react"

import PlayIcon from "remixicon-react/PlayLineIcon"
import CancelIcon from "remixicon-react/CloseCircleLineIcon"
import { TransactionWithCategories } from "../../types/types"

interface UploadPreviewProps {
  transactions: Prisma.TransactionCreateInput[]
}

// TODO: add methods
// TODO: add categories
const UploadPreview = ({ transactions }: UploadPreviewProps) => {
  return (
    <>
      <HStack>
        <Button
          leftIcon={<Icon as={CancelIcon} boxSize={5} />}
          onClick={() => {}}
          variant="ghost"
          colorScheme="red"
        >
          Cancel
        </Button>
        <Button
          leftIcon={<Icon as={PlayIcon} boxSize={5} />}
          onClick={() => {}}
          colorScheme="green"
        >
          Apply
        </Button>
      </HStack>

      <Divider my={6} />
      <Box w="100%" h="50%">
        <Datatable
          categories={[]}
          // TODO: better typings, fragile
          transactions={transactions as TransactionWithCategories[]}
        />
      </Box>
    </>
  )
}

export default UploadPreview
