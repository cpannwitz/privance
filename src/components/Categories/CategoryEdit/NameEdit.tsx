import { Controller, useFormContext } from 'react-hook-form';
import { CategoryEditFormValues } from './CategoryEdit';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

interface NameEditProps {}

const NameEdit = ({}: NameEditProps) => {
  const { control } = useFormContext<CategoryEditFormValues>();
  return (
    <Controller
      name="name"
      control={control}
      rules={{
        required: true
      }}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>Name</FormLabel>
          <TextField {...field} />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default NameEdit;
