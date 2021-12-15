import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react"

import UploadPreview from "./UploadPreview"
import UploadCSV from "../UploadCSV/UploadCSV"
import { Category } from ".prisma/client"
import {
  AutomationRuleWithCategories,
  TransactionCreateInputWithCategories,
} from "../../types/types"

interface UploadProps {
  categories: Category[]
  automationRules: AutomationRuleWithCategories[]
}

const Upload = ({ categories, automationRules }: UploadProps) => {
  const toast = useToast()
  const router = useRouter()

  const [uploadedTransactions, setUploadedTransactions] = useState<
    TransactionCreateInputWithCategories[] | undefined
  >(undefined)
  function onUploadRawTransactions(transactions: TransactionCreateInputWithCategories[]) {
    setUploadedTransactions(transactions)
  }

  function onCancelUploadTransactions() {
    router.push({
      pathname: `/upload`,
    })
  }
  function onUploadTransactions() {
    if (uploadedTransactions) {
      const finalTransactions = uploadedTransactions.map(transaction => ({
        ...transaction,
        categories: { connect: transaction.categories.map(cat => ({ id: cat.id })) },
      }))

      // TODO: extract api call
      axios
        .post("/api/transactions/addTransactions", finalTransactions)
        .then(() => {
          toast({
            title: `Added your transactions!`,
            status: "success",
          })
          router.push({
            pathname: `/overview`,
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't add your transactions: ${error.response.data.error}`,
              status: "error",
            })
            router.push({
              pathname: `/upload`,
            })
          }
        })
    }
  }

  if (uploadedTransactions) {
    return (
      <UploadPreview
        transactions={uploadedTransactions}
        categories={categories}
        onCancel={onCancelUploadTransactions}
        onUpload={onUploadTransactions}
      />
    )
  }

  return <UploadCSV onUpload={onUploadRawTransactions} automationRules={automationRules} />
}

export default Upload
