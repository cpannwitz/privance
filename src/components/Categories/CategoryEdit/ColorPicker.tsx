import { Controller, useFormContext } from "react-hook-form"
import { CategoryEditFormValues } from "./CategoryEdit"
import { CirclePicker } from "react-color"

import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

interface ColorPickerProps {}

const ColorPicker = ({}: ColorPickerProps) => {
  const { control } = useFormContext<CategoryEditFormValues>()
  return (
    <Controller
      name="color"
      control={control}
      render={({ field }) => (
        <FormControl>
          <FormLabel>Color</FormLabel>
          <CirclePicker
            color={field.value}
            onChangeComplete={({ hex }) => field.onChange(hex)}
            width="100%"
          />
        </FormControl>
      )}
    />
  )
}

export default ColorPicker
