import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import { useNotification } from '../NotificationSystem/useNotification'
import UploadPreview from './UploadPreview'
import UploadCSV from '../UploadCSV/UploadCSV'
import { AutomationRuleWithCategory, TransactionBeforeUpload } from '../../types/types'
import { Category } from '@prisma/client'

interface UploadProps {
  automationRules: AutomationRuleWithCategory[]
  categories?: Category[]
}

const Upload = ({ automationRules, categories = [] }: UploadProps) => {
  const router = useRouter()
  const { notify } = useNotification()

  const [uploadedTransactions, setUploadedTransactions] = useState<
    TransactionBeforeUpload[] | undefined
  >(undefined)

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
      console.log(
        `LOG |  ~ file: Upload.tsx ~ line 46 ~ onUploadTransactions ~ uploadedTransactions`,
        uploadedTransactions
      )
      // TODO: extract api call
      axios
        .post('/api/transactions/addTransactions', uploadedTransactions)
        .then(() => {
          notify('Added your transactions', 'success')
          router.push({
            pathname: `/overview`
          })
        })
        .catch((error: AxiosError<{ error: string }>) => {
          if (error.response) {
            notify(`Couldn't add your transactions: ${error.response.data.error}`, 'error')
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
