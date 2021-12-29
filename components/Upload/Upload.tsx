import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"
import { useToast } from "@chakra-ui/react"

import UploadPreview from "./UploadPreview"
import UploadCSV from "../UploadCSV/UploadCSV"
import { Category } from ".prisma/client"
import { AutomationRuleWithCategory, TransactionCreateInputWithCategory } from "../../types/types"

interface UploadProps {
  categories: Category[]
  automationRules: AutomationRuleWithCategory[]
}

const Upload = ({ categories, automationRules }: UploadProps) => {
  const toast = useToast()
  const router = useRouter()

  const [uploadedTransactions, setUploadedTransactions] = useState<
    TransactionCreateInputWithCategory[] | undefined
  >(undefined)

  function onUpdateTransaction(transaction: TransactionCreateInputWithCategory) {
    if (uploadedTransactions) {
      const index = uploadedTransactions.findIndex(t => t.identifier === transaction.identifier)
      setUploadedTransactions(state => {
        if (state) {
          const newState = [...state]
          newState.splice(index, 1, transaction)
          return newState
        }
      })
    }
  }

  function onUploadRawTransactions(transactions: TransactionCreateInputWithCategory[]) {
    setUploadedTransactions(transactions)
  }

  function onCancelUploadTransactions() {
    setUploadedTransactions(undefined)
  }
  function onUploadTransactions() {
    if (uploadedTransactions) {
      const finalTransactions = uploadedTransactions.map(transaction => ({
        ...transaction,
        categories: transaction.category ? { connect: { id: transaction.category.id } } : undefined,
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
            onCancelUploadTransactions()
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
        onUpdateTransaction={onUpdateTransaction}
      />
    )
  }

  return <UploadCSV onUpload={onUploadRawTransactions} automationRules={automationRules} />
}

export default Upload
