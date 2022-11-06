import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'

import { AutomationRuleWithCategory } from '../../../types/types'

interface ValuePickerProps {}

const ValuePicker = ({}: ValuePickerProps) => {
  const {
    register,
    unregister,
    formState: { errors }
  } = useFormContext<AutomationRuleWithCategory>()
  useEffect(() => {
    return () => {
      unregister('value')
    }
  }, [unregister])
  return (
    <FormControl error={!!errors.value}>
      <FormLabel>Insert value</FormLabel>
      <TextField {...register('value', {})} />
      <FormHelperText>{errors.value?.message}</FormHelperText>
    </FormControl>
  )
}

export default ValuePicker
