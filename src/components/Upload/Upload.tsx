import { useState } from 'react'
import { useRouter } from 'next/router'

import UploadPreview from './UploadPreview'
import UploadCSV from '../UploadCSV/UploadCSV'
import { AutomationRuleWithCategory, TransactionBeforeUpload } from '../../types/types'
import { Category } from '@prisma/client'
import { useAddTransactions } from '../ApiSystem/api/transactions'

interface UploadProps {
  automationRules: AutomationRuleWithCategory[]
  categories?: Category[]
}

const Upload = ({ automationRules, categories = [] }: UploadProps) => {
  const router = useRouter()
  const { mutateAsync: addTransactions, isLoading: isLoadingAddTransactions } = useAddTransactions()

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
      addTransactions(uploadedTransactions)
        .then(() =>
          router.push({
            pathname: `/overview`
          })
        )
        .catch(() => onCancelUploadTransactions())
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
        isLoading={isLoadingAddTransactions}
      />
    )
  }

  return <UploadCSV onUpload={onUploadRawTransactions} automationRules={automationRules} />
}

export default Upload
