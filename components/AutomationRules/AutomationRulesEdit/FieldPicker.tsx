import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { AutomationRuleWithCategory } from "../../../types/types"

import { fieldValues } from "./FormUtils"

interface FieldPickerProps {}

const FieldPicker = ({}: FieldPickerProps) => {
  const { control } = useFormContext<AutomationRuleWithCategory>()

  return (
    <Controller
      name="field"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel fontSize="sm" color="gray.500">
            Select field
          </FormLabel>
          <Select
            placeholder="Select Field"
            variant="filled"
            onChange={e => field.onChange(e.target.value)}
            value={field.value}
          >
            {fieldValues.map(f => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}

export default FieldPicker
