import { Controller, useFormContext } from "react-hook-form"
import { AutomationRuleWithCategory } from "../../../types/types"

import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"

import { fieldValues } from "./FormUtils"

interface FieldPickerProps {}

const FieldPicker = ({}: FieldPickerProps) => {
  const { control } = useFormContext<AutomationRuleWithCategory>()

  return (
    <Controller
      name="field"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>Select field</FormLabel>
          <Select
            placeholder="Select Field"
            onChange={e => field.onChange(e.target.value)}
            value={field.value}
          >
            {fieldValues.map(f => (
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

export default FieldPicker
