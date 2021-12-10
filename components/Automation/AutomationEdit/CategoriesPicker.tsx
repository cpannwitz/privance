import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { AutomationRule } from "../../../types/types"

import CategorySelect from "../../CategorySelect/CategorySelect"
import useGetCategories from "../../hooks/useGetCategories"

interface FieldPickerProps {}

const FieldPicker = ({}: FieldPickerProps) => {
  const { control } = useFormContext<AutomationRule>()

  const { data: categories, isError, isLoading } = useGetCategories()
  return (
    <Controller
      name="categories"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel fontSize="sm" color="gray.500">
            Select Categories
          </FormLabel>
          <CategorySelect
            onChange={val => field.onChange(val)}
            value={field.value}
            categories={categories || []}
            isDisabled={isError}
            isLoading={isLoading}
            emptyDisplaySize="big"
            avatarGroupLength={6}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}

export default FieldPicker
