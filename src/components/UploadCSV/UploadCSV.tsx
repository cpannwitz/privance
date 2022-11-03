import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useSnackbar } from 'notistack';

import ChartIcon from '@mui/icons-material/AddchartOutlined';

import parseCSVToTransactions from './parseCSVToJSON';
import normalizeCSVTransactions from './normalizeCSVTransactions';

import Dropzone from './Dropzone';
import assignNewTransactionCategory from './assignNewTransactionCategory';
import type { AutomationRuleWithCategory, TransactionBeforeUpload } from '../../types/types';

interface UploadCSVProps {
  onUpload?: (transaction: TransactionBeforeUpload[]) => void;
  automationRules: AutomationRuleWithCategory[];
}

const UploadCSV = ({
  automationRules,
  onUpload = () => {
    return;
  }
}: UploadCSVProps) => {
  const { enqueueSnackbar } = useSnackbar();

  async function onDrop(files: File[]) {
    if (!files || files.length > 1) {
      enqueueSnackbar('Please upload only one file.', {
        variant: 'error'
      });
      return;
    }

    const file = files[0];

    if (file.type !== 'text/csv') {
      enqueueSnackbar('Wrong file format', {
        variant: 'error'
      });
      return;
    }

    const parsedCSVTransactions = await parseCSVToTransactions(file);

    if (!parsedCSVTransactions.data) {
      enqueueSnackbar('No data found OR not able to process ', {
        variant: 'error'
      });
      return;
    }

    if (parsedCSVTransactions.error) {
      enqueueSnackbar(parsedCSVTransactions.error.message, {
        variant: 'error'
      });
      console.error(`ERROR |  ~ onDrop ~ UploadCSV )`, parsedCSVTransactions.error);
      return;
    }

    const normalizedCSVTransactions = await normalizeCSVTransactions(parsedCSVTransactions.data);

    if (!automationRules || automationRules.length <= 0) {
      onUpload(normalizedCSVTransactions);
    } else {
      const transactionsWithCategory = await assignNewTransactionCategory(
        normalizedCSVTransactions,
        automationRules
      );

      onUpload(transactionsWithCategory);
    }
  }
  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {() => (
        <Box
          sx={{ display: 'flex', height: '90vh', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box display="flex" alignItems="center">
            <ChartIcon fontSize="large" />
            <Stack direction="column" ml={2}>
              <Typography variant="h5">Drag .csv file here to upload data</Typography>
              <Typography color="GrayText" variant="body1">
                Only use ING Diba export csv files!
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
    </Dropzone>
  );
};

export default UploadCSV;
