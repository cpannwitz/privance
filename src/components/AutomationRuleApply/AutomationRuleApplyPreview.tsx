import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import { AutomationRuleWithCategory, TransactionWithCategory } from '../../types/types'
import TransactionDatagrid from '../TransactionDatagrid/TransactionDatagrid'

import { useNotification } from '../NotificationSystem/useNotification'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

import PlayIcon from '@mui/icons-material/PlayArrowOutlined'
import CancelIcon from '@mui/icons-material/CancelOutlined'
import { Category } from '@prisma/client'
import CategoryDisplay from '../CategoryDisplay/CategoryDisplay'

interface AutomationRuleApplyPreviewProps {
  automationRule: AutomationRuleWithCategory
  transactions: TransactionWithCategory[]
  categories?: Category[]
}

const AutomationRuleApplyPreview = ({
  automationRule,
  transactions,
  categories = []
}: AutomationRuleApplyPreviewProps) => {
  const router = useRouter()
  function onCancel() {
    router.push(`/automationrules`)
  }

  const { notify } = useNotification()
  function onApplyCategory() {
    const bodyData = transactions.map(transaction => ({
      id: transaction.id,
      categoryConnect: automationRule.categoryId
    }))

    axios
      .post<{ data: TransactionWithCategory[] }>(
        '/api/transactions/updateTransactionsCategory',
        bodyData
      )
      .then(res => {
        console.log(`LOG |  ~ file: AutomationRuleApplyPreview.tsx ~ line 48 ~ .then ~ res`, res)
        notify(`Updated your transactions!`, 'success')
        router.push(`/overview`)
      })
      .catch((error: AxiosError<any>) => {
        if (error.response) {
          notify(`Couldn't update your transactions: ${error.response.data.error}`, 'error')
        }
      })
  }

  return (
    <>
      <Alert severity="info" sx={{ mb: 5 }}>
        <Box sx={{ mr: 1, display: 'inline' }}>
          Could apply following category to <b>{transactions.length}</b> transactions:
        </Box>

        <CategoryDisplay category={automationRule.category} />
      </Alert>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *': { ml: 2 }
          }}
        >
          <Button startIcon={<CancelIcon />} onClick={onCancel} variant="text" color="error">
            Cancel
          </Button>
          <Button
            startIcon={<PlayIcon />}
            onClick={onApplyCategory}
            color="primary"
            variant="contained"
          >
            Apply
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />
      <Box sx={{ width: '100%', height: '50%' }}>
        <TransactionDatagrid transactions={transactions} categories={categories} />
      </Box>
    </>
  )
}

export default AutomationRuleApplyPreview
