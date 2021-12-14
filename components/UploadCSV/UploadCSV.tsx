import axios from "axios"
import { Center, HStack, Icon, Text, useToast } from "@chakra-ui/react"

import FileChartLineIcon from "remixicon-react/FileChartLineIcon"

import parseCSVToJSON from "./parseCSVToJSON"
import transformTransactions from "./transformTransactions"

import Dropzone from "./Dropzone"
import { Prisma } from ".prisma/client"

interface UploadCSVProps {
  onUpload?: (transaction: Prisma.TransactionCreateInput[]) => void
}

const UploadCSV = ({ onUpload = () => {} }: UploadCSVProps) => {
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

    const parsedJSON = await parseCSVToJSON(file)

    if (!parsedJSON.data) {
      toast({
        title: "No data found OR not able to process ",
        status: "error",
      })
      return
    }

    // TODO: move transformation to preview component, once initialized -> display raw values for preview
    const transformedJSON = await transformTransactions(parsedJSON.data)

    if (parsedJSON.error) {
      toast({
        title: parsedJSON.error.message,
        status: "error",
      })
      console.error(`ERROR |  ~ onDrop ~ UploadCSV )`, parsedJSON.error)
      return
    }

    if (transformedJSON) {
      onUpload(transformedJSON)
      // axios
      //   .post("/api/transactions/addTransactions", transformedJSON)
      //   // TODO: handle response data, either reflow, global state or discard
      //   .then(() => {
      //     // res.data
      //     toast({
      //       title: `Added or updated your transactions!`,
      //       status: "success",
      //     })
      //   })
    }
  }
  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {() => (
        <Center height={200}>
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
