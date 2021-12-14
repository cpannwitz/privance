import { useState } from "react"
import UploadCSV from "../UploadCSV/UploadCSV"

import { Prisma } from ".prisma/client"
import UploadPreview from "./UploadPreview"

interface UploadProps {}

const Upload = ({}: UploadProps) => {
  const [uploadedTransactions, setUploadedTransactions] = useState<
    Prisma.TransactionCreateInput[] | undefined
  >(undefined)
  const onUpload = (transactions: Prisma.TransactionCreateInput[]) =>
    setUploadedTransactions(transactions)

  if (uploadedTransactions) {
    return <UploadPreview transactions={uploadedTransactions} />
  }

  return (
    <>
      <UploadCSV onUpload={onUpload} />
    </>
  )
}

export default Upload
