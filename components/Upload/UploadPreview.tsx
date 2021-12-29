import { Category } from ".prisma/client"

import TransactionTable from "../TransactionTable/TransactionTable"
import { Box, Stack, Divider, Button, Icon, Spacer, Heading } from "@chakra-ui/react"

import PlayIcon from "remixicon-react/PlayLineIcon"
import CancelIcon from "remixicon-react/CloseCircleLineIcon"
import { TransactionCreateInputWithCategory, TransactionWithCategory } from "../../types/types"

interface UploadPreviewProps {
  transactions: TransactionCreateInputWithCategory[]
  categories: Category[]
  onCancel: () => void
  onUpload: () => void
  onUpdateTransaction?: (transaction: TransactionCreateInputWithCategory) => void
}

const UploadPreview = ({
  transactions,
  categories,
  onCancel,
  onUpload,
  onUpdateTransaction = () => {},
}: UploadPreviewProps) => {
  return (
    <>
      <Stack direction="row">
        <Heading size="md">You uploaded {transactions.length} transactions.</Heading>
        <Spacer />
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
      </Stack>

      <Divider my={6} />
      <Box w="100%" h="85%">
        <TransactionTable
          categories={categories}
          // TODO: better typings, fragile
          transactions={transactions as TransactionWithCategory[]}
          variant="preview"
          updateTransaction={onUpdateTransaction}
        />
      </Box>
    </>
  )
}

export default UploadPreview
