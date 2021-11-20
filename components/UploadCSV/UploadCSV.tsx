import { Group, Text } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { useNotifications } from "@mantine/notifications"
import { ImageIcon } from "@modulz/radix-icons"

import axios from "axios"
import parseCSVToJSON from "./parseCSVToJSON"

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
        .post("/api/addTransactions", parsedJSON.data)
        // TODO: handle response data, either reflow, global state or discard
        .then(res => console.log("res:", res.data))
    }
  }
  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {() => (
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: "none" }}>
          <ImageIcon />
          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      )}
    </Dropzone>
  )
}

export default UploadCSV
