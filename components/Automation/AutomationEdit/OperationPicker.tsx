import { FormControl, FormErrorMessage, FormLabel, Select } from "@chakra-ui/react"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { AutomationRuleWithCategories } from "../../../types/types"

import { getOperationType } from "./FormUtils"

interface OperationPickerProps {}

const OperationPicker = ({}: OperationPickerProps) => {
  const { control } = useFormContext<AutomationRuleWithCategories>()
  const fieldValue = useWatch({
    name: "field",
    control,
  })
  const operationType = getOperationType(fieldValue)
  return (
    <Controller
      name="operation"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel fontSize="sm" color="gray.500">
            Select operation
          </FormLabel>
          <Select
            placeholder="Select Operation"
            variant="filled"
            onChange={e => field.onChange(e.target.value)}
            value={field.value}
          >
            {operationType.map(f => (
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

export default OperationPicker
