import { Category } from ".prisma/client"

import TransactionTable from "../TransactionTable/TransactionTable"
import { Box, HStack, Divider, Button, Icon } from "@chakra-ui/react"

import PlayIcon from "remixicon-react/PlayLineIcon"
import CancelIcon from "remixicon-react/CloseCircleLineIcon"
import { TransactionCreateInputWithCategories, TransactionWithCategories } from "../../types/types"

interface UploadPreviewProps {
  transactions: TransactionCreateInputWithCategories[]
  categories: Category[]
  onCancel?: () => void
  onUpload?: () => void
}

// TODO: make categories (maybe all Data?) editable: TransactionTable onEdit -> UploadPreview onEdit -> Upload (edit state with transactions)
// TODO: maybe use state management lib?

const UploadPreview = ({
  transactions,
  categories,
  onCancel = () => {},
  onUpload = () => {},
}: UploadPreviewProps) => {
  return (
    <>
      <HStack>
        <Button
          leftIcon={<Icon as={CancelIcon} boxSize={5} />}
          onClick={onCancel}
          variant="ghost"
          colorScheme="red"
        >
          Cancel
        </Button>
        <Button
          leftIcon={<Icon as={PlayIcon} boxSize={5} />}
          onClick={onUpload}
          colorScheme="green"
        >
          Upload Transactions
        </Button>
      </HStack>

      <Divider my={6} />
      <Box w="100%" h="50%">
        <TransactionTable
          categories={categories}
          // TODO: better typings, fragile
          transactions={transactions as TransactionWithCategories[]}
          variant="preview"
        />
      </Box>
    </>
  )
}

export default UploadPreview
