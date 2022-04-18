import { Controller, useFormContext, useWatch } from "react-hook-form"
import { AutomationRuleWithCategory } from "../../../types/types"

import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"

import { getOperationType } from "./FormUtils"

interface OperationPickerProps {}

const OperationPicker = ({}: OperationPickerProps) => {
  const { control } = useFormContext<AutomationRuleWithCategory>()
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
        <FormControl error={!!error}>
          <FormLabel>Select operation</FormLabel>
          <Select
            placeholder="Select Operation"
            onChange={e => field.onChange(e.target.value)}
            value={field.value}
          >
            {operationType.map(f => (
              <MenuItem key={f.value} value={f.value}>
                {f.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default OperationPicker
