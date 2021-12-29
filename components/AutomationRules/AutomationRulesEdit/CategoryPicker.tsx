import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { AutomationRuleWithCategory } from "../../../types/types"

import CategorySelect from "../../CategorySelect/CategorySelect"
import useGetCategories from "../../hooks/useGetCategories"

interface CategoryPickerProps {}

const CategoryPicker = ({}: CategoryPickerProps) => {
  const { control } = useFormContext<AutomationRuleWithCategory>()

  const { data: categories, isError, isLoading } = useGetCategories()
  return (
    <Controller
      name="category"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel fontSize="sm" color="gray.500">
            Select Category
          </FormLabel>
          <CategorySelect
            onChange={val => field.onChange(val)}
            value={field.value}
            categories={categories || []}
            isDisabled={isError}
            isLoading={isLoading}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}

export default CategoryPicker
