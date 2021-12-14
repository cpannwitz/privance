import { useState } from "react"
import UploadCSV from "../UploadCSV/UploadCSV"

interface UploadProps {}

const Upload = ({}: UploadProps) => {
  const [uploadedTransactions, setUploadedTransactions] = useState(undefined)
  return (
    <>
      <UploadCSV />
    </>
  )
}

export default Upload
