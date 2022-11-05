import TransactionDatagrid from '../TransactionDatagrid/TransactionDatagrid'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

import PlayIcon from '@mui/icons-material/PlayArrowOutlined'
import CancelIcon from '@mui/icons-material/CancelOutlined'

import { TransactionBeforeUpload, TransactionWithCategory } from '../../types/types'
import { Category } from '@prisma/client'

interface UploadPreviewProps {
  transactions: TransactionBeforeUpload[]
  categories?: Category[]
  onCancel: () => void
  onUpload: () => void
  onUpdateTransaction?: (transaction: TransactionBeforeUpload) => void
}

const UploadPreview = ({
  transactions,
  categories = [],
  onCancel,
  onUpload,
  onUpdateTransaction = () => {
    return
  }
}: UploadPreviewProps) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">You uploaded {transactions.length} transactions.</Typography>

        <Box>
          <Button
            startIcon={<CancelIcon />}
            onClick={onCancel}
            variant="text"
            color="error"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" startIcon={<PlayIcon />} onClick={onUpload}>
            Upload Transactions
          </Button>
        </Box>
      </Stack>

      <Divider sx={{ my: 6 }} />
      <Box sx={{ width: '100%', height: '85%' }}>
        <TransactionDatagrid
          // TODO: better typings, fragile
          transactions={transactions as TransactionWithCategory[]}
          categories={categories}
          onUpdateTransaction={onUpdateTransaction}
        />
      </Box>
    </>
  )
}

export default UploadPreview
