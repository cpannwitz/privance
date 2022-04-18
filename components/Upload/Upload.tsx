import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"

import UploadPreview from "./UploadPreview"
import UploadCSV from "../UploadCSV/UploadCSV"
import { AutomationRuleWithCategory, TransactionBeforeUpload } from "../../types/types"

interface UploadProps {
  automationRules: AutomationRuleWithCategory[]
}

const Upload = ({ automationRules }: UploadProps) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const [uploadedTransactions, setUploadedTransactions] =
    useState<TransactionBeforeUpload[] | undefined>(undefined)

  function onUpdateTransaction(transaction: TransactionBeforeUpload) {
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

  function onUploadRawTransactions(transactions: TransactionBeforeUpload[]) {
    setUploadedTransactions(transactions)
  }

  function onCancelUploadTransactions() {
    setUploadedTransactions(undefined)
  }
  function onUploadTransactions() {
    if (uploadedTransactions) {
      // TODO: extract api call
      axios
        .post("/api/transactions/addTransactions", uploadedTransactions)
        .then(() => {
          enqueueSnackbar("Added your transactions", {
            variant: "success",
          })
          router.push({
            pathname: `/overview`,
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            enqueueSnackbar(`Couldn't add your transactions: ${error.response.data.error}`, {
              variant: "error",
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
        onCancel={onCancelUploadTransactions}
        onUpload={onUploadTransactions}
        onUpdateTransaction={onUpdateTransaction}
      />
    )
  }

  return <UploadCSV onUpload={onUploadRawTransactions} automationRules={automationRules} />
}

export default Upload
