import { Group, Text } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { useNotifications } from "@mantine/notifications"
import { GrDocumentCsv } from "@react-icons/all-files/gr/GrDocumentCsv"

import axios from "axios"
import parseCSVToJSON from "./parseCSVToJSON"
import transformTransactions from "./transformTransactions"

interface UploadCSVProps {}

const UploadCSV = ({}: UploadCSVProps) => {
  const notifications = useNotifications()

  async function onDrop(files: File[]) {
    if (!files || files.length > 1) {
      notifications.showNotification({
        message: "Please upload only one file.",
        color: "red",
      })
      return
    }

    const file = files[0]

    if (file.type !== "text/csv") {
      notifications.showNotification({
        message: "Wrong file format",
        color: "red",
      })
      return
    }

    const parsedJSON = await parseCSVToJSON(file)

    if (!parsedJSON.data) {
      notifications.showNotification({
        message: "No data found OR not able to process ",
        color: "red",
      })
      return
    }

    // TODO: move transformation to preview component, once initialized -> display raw values for preview
    const transformedJSON = await transformTransactions(parsedJSON.data)

    if (parsedJSON.error) {
      notifications.showNotification({
        message: parsedJSON.error.message,
        color: "red",
      })
      console.error(`ERROR |  ~ onDrop ~ UploadCSV )`, parsedJSON.error)
      return
    }

    if (parsedJSON.data) {
      axios
        .post("/api/addTransactions", transformedJSON)
        // TODO: handle response data, either reflow, global state or discard
        .then(res => console.log("res:", res.data))
    }
  }
  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {() => (
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
          <GrDocumentCsv size={32} />
          <div>
            <Text size="xl" inline>
              Drag .csv file here to upload data
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Only use ING Diba export csv files!
            </Text>
          </div>
        </Group>
      )}
    </Dropzone>
  )
}

export default UploadCSV
