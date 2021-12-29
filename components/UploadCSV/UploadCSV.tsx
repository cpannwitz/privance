import { Center, HStack, Icon, Text, useToast } from "@chakra-ui/react"

import FileChartLineIcon from "remixicon-react/FileChartLineIcon"

import parseCSVToTransactions from "./parseCSVToJSON"
import normalizeCSVTransactions from "./transformTransactions"

import Dropzone from "./Dropzone"
import assignNewTransactionCategory from "./assignNewTransactionCategory"
import { AutomationRuleWithCategory, TransactionCreateInputWithCategory } from "../../types/types"

interface UploadCSVProps {
  onUpload?: (transaction: TransactionCreateInputWithCategory[]) => void
  automationRules: AutomationRuleWithCategory[]
}

const UploadCSV = ({ automationRules, onUpload = () => {} }: UploadCSVProps) => {
  const toast = useToast()

  async function onDrop(files: File[]) {
    if (!files || files.length > 1) {
      toast({
        title: "Please upload only one file.",
        status: "error",
      })
      return
    }

    const file = files[0]

    if (file.type !== "text/csv") {
      toast({
        title: "Wrong file format",
        status: "error",
      })
      return
    }

    const parsedCSVTransactions = await parseCSVToTransactions(file)

    if (!parsedCSVTransactions.data) {
      toast({
        title: "No data found OR not able to process ",
        status: "error",
      })
      return
    }

    if (parsedCSVTransactions.error) {
      toast({
        title: parsedCSVTransactions.error.message,
        status: "error",
      })
      console.error(`ERROR |  ~ onDrop ~ UploadCSV )`, parsedCSVTransactions.error)
      return
    }

    const normalizedCSVTransactions = await normalizeCSVTransactions(parsedCSVTransactions.data)

    if (!automationRules || automationRules.length <= 0) {
      onUpload(normalizedCSVTransactions)
    } else {
      const transactionsWithCategory = await assignNewTransactionCategory(
        normalizedCSVTransactions,
        automationRules
      )

      // if (transactionsWithCategory) {
      onUpload(transactionsWithCategory)
      // }
    }
  }
  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {() => (
        <Center height="90vh">
          <HStack spacing={6}>
            <Icon as={FileChartLineIcon} boxSize={10} />
            <div>
              <Text mb={1} fontSize="xl">
                Drag .csv file here to upload data
              </Text>
              <Text size="sm" color="gray.500">
                Only use ING Diba export csv files!
              </Text>
            </div>
          </HStack>
        </Center>
      )}
    </Dropzone>
  )
}

export default UploadCSV
