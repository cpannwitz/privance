import { FormControl, FormLabel } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { CategoryEditFormValues } from "./CategoryEdit"
import { CirclePicker } from "react-color"

interface ColorPickerProps {}

const ColorPicker = ({}: ColorPickerProps) => {
  const { control } = useFormContext<CategoryEditFormValues>()
  return (
    <Controller
      name="color"
      control={control}
      render={({ field }) => (
        <FormControl>
          <FormLabel fontSize="sm" color="gray.500">
            Color
          </FormLabel>
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
