import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Center from './Center'

const DataIsError = ({ retry }: { retry: () => void }) => (
  <Center sx={{ height: '12rem' }}>
    <Stack direction="column">
      <Typography sx={{ mb: 2 }} color="GrayText">
        Couldn&apos;t fetch your data. Please retry.
      </Typography>
      <Button variant="outlined" color="warning" size="small" onClick={retry}>
        Reload
      </Button>
    </Stack>
  </Center>
)
export default DataIsError
