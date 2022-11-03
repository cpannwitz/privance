import CircularProgress from '@mui/material/CircularProgress';
import Center from '../shared/Center';

const DataIsLoading = () => (
  <Center sx={{ height: '12rem' }}>
    <CircularProgress />
  </Center>
);

export default DataIsLoading;
