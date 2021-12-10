import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { CategoryEditFormValues } from "./CategoryEdit"

interface NameEditProps {}

const NameEdit = ({}: NameEditProps) => {
  const { control } = useFormContext<CategoryEditFormValues>()
  return (
    <Controller
      name="name"
      control={control}
      rules={{
        required: true,
      }}
      render={({ field, fieldState }) => (
        <FormControl isInvalid={!!fieldState.error}>
          <FormLabel fontSize="sm" color="gray.500">
            Name
          </FormLabel>
          <Input {...field} />
        </FormControl>
      )}
    />
  )
}

export default NameEdit
