import { useCallback } from 'react';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Center from '../shared/Center';

const DataIsEmpty = ({ linkUrl }: { linkUrl?: string }) => {
  const router = useRouter();
  const linkToUpload = useCallback(() => router.push(linkUrl || ''), [router, linkUrl]);
  return (
    <Center sx={{ height: '12rem' }}>
      <Stack direction="column">
        <Typography sx={{ mb: 2 }} color="GrayText">
          You currently have no data. Please add some first.
        </Typography>
        {linkUrl ? (
          <Button variant="outlined" color="warning" size="small" onClick={linkToUpload}>
            Add some data
          </Button>
        ) : null}
      </Stack>
    </Center>
  );
};

export default DataIsEmpty;
