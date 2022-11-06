import { Controller, useFormContext } from 'react-hook-form'
import { AutomationRuleWithCategory } from '../../../types/types'

import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'

import CategorySelect from '../../CategorySelect/CategorySelect'

interface CategoryPickerProps {}

const CategoryPicker = ({}: CategoryPickerProps) => {
  const { control } = useFormContext<AutomationRuleWithCategory>()

  return (
    <Controller
      name="category"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>Select Category</FormLabel>
          <Box>
            <CategorySelect onChange={val => field.onChange(val)} value={field.value} />
          </Box>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default CategoryPicker
