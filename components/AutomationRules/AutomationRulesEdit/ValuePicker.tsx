import { Controller, useFormContext, useWatch } from "react-hook-form"
import { useEffect } from "react"
import {
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react"
import { getFieldType, parseDateToString, parseStringToDate } from "./FormUtils"

import { AutomationRuleWithCategory } from "../../../types/types"

interface ValuePickerProps {}

const ValuePicker = ({}: ValuePickerProps) => {
  const { control } = useFormContext<AutomationRuleWithCategory>()
  const fieldValue = useWatch({
    name: "field",
    control,
  })
  const inputType = getFieldType(fieldValue)

  if (inputType === "number") return <NumericalInputField />
  if (inputType === "date") return <DateInputField />
  if (inputType === "string") return <TextInputField />
  return <DisabledInputField />
}

export default ValuePicker

const DisabledInputField = () => (
  <FormControl isInvalid={true}>
    <FormLabel fontSize="sm" color="gray.500">
      Select field first
    </FormLabel>
    <Input disabled placeholder="Select field first" />
    <FormErrorMessage>Please fill in an appropiate value.</FormErrorMessage>
  </FormControl>
)

const TextInputField = () => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext<AutomationRuleWithCategory>()
  useEffect(() => {
    return () => {
      unregister("stringValue")
    }
  }, [unregister])
  return (
    <FormControl isInvalid={!!errors.stringValue}>
      <FormLabel fontSize="sm" color="gray.500">
        Insert value
      </FormLabel>
      <Input {...register("stringValue", {})} />
      <FormErrorMessage>{errors.stringValue?.message}</FormErrorMessage>
    </FormControl>
  )
}

const NumericalInputField = () => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext<AutomationRuleWithCategory>()
  useEffect(() => {
    return () => {
      unregister("numberValue")
    }
  }, [unregister])
  return (
    <FormControl isInvalid={!!errors.numberValue}>
      <FormLabel fontSize="sm" color="gray.500">
        Insert value
      </FormLabel>
      <NumberInput>
        <NumberInputField {...register("numberValue", {})} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{errors.numberValue?.message}</FormErrorMessage>
    </FormControl>
  )
}

const DateInputField = () => {
  const { control } = useFormContext<AutomationRuleWithCategory>()

  return (
    <Controller
      name="dateValue"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel fontSize="sm" color="gray.500">
            Insert value
          </FormLabel>
          <Input
            {...field}
            pattern="d{4}-d{2}-d{2}"
            type="date"
            value={parseDateToString(field.value)}
            onChange={e => field.onChange(parseStringToDate(e.target.value))}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  )
}
