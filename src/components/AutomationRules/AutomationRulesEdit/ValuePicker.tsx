import { Controller, useFormContext, useWatch } from "react-hook-form"
import { useEffect } from "react"

import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"

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
  <FormControl error={true}>
    <FormLabel>Select field first</FormLabel>
    <TextField disabled placeholder="Select field first" />
    <FormHelperText>Please fill in an appropiate value.</FormHelperText>
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
    <FormControl error={!!errors.stringValue}>
      <FormLabel>Insert value</FormLabel>
      <TextField {...register("stringValue", {})} />
      <FormHelperText>{errors.stringValue?.message}</FormHelperText>
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
    <FormControl error={!!errors.numberValue}>
      <FormLabel>Insert value</FormLabel>
      <TextField
        inputProps={{
          type: "number",
        }}
        {...register("numberValue", {})}
      />
      <FormHelperText>{errors.numberValue?.message}</FormHelperText>
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
        <FormControl error={!!error}>
          <FormLabel>Insert value</FormLabel>
          <TextField
            {...field}
            type="date"
            inputProps={{
              pattern: "d{4}-d{2}-d{2}",
            }}
            value={parseDateToString(field.value)}
            onChange={e => field.onChange(parseStringToDate(e.target.value))}
          />
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}
