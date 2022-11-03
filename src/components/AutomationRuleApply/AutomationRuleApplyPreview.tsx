import axios, { type AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { AutomationRuleWithCategory, TransactionWithCategory } from '../../types/types';
import TransactionDatagrid from '../TransactionDatagrid/TransactionDatagrid';

import { icons, placeholderIcon } from '../../shared/iconUtils';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useSnackbar } from 'notistack';

import PlayIcon from '@mui/icons-material/PlayArrowOutlined';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import type { Category } from '@prisma/client';

interface AutomationRuleApplyPreviewProps {
  automationRule: AutomationRuleWithCategory;
  transactions: TransactionWithCategory[];
  categories?: Category[];
}

const AutomationRuleApplyPreview = ({
  automationRule,
  transactions,
  categories = []
}: AutomationRuleApplyPreviewProps) => {
  const router = useRouter();
  function onCancel() {
    router.push(`/automationrules`);
  }

  const { enqueueSnackbar } = useSnackbar();
  function onApplyCategory() {
    const bodyData = transactions.map(transaction => ({
      id: transaction.id,
      categoryConnect: transaction.category?.id
    }));

    axios
      .post<{ data: TransactionWithCategory[] }>(
        '/api/transactions/updateTransactionsCategory',
        bodyData
      )
      .then(() => {
        enqueueSnackbar(`Updated your transactions!`, {
          variant: 'success'
        });
        router.push(`/overview`);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          enqueueSnackbar(`Couldn't update your transactions: ${error.response.data.error}`, {
            variant: 'error'
          });
        }
      });
  }

  return (
    <>
      <Alert severity="info" sx={{ mb: 5 }}>
        <Box sx={{ mr: 1, display: 'inline' }}>
          Could apply following category to <b>{transactions.length}</b> transactions:
        </Box>

        <Chip
          key={automationRule.id}
          label={automationRule.category.name}
          icon={
            automationRule.category.icon ? icons[automationRule.category.icon] : placeholderIcon
          }
          sx={{
            backgroundColor: automationRule.category.color || undefined,
            color: 'white',
            '& .MuiChip-icon': { color: 'white' }
          }}
        />
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
  );
};

export default AutomationRuleApplyPreview;
