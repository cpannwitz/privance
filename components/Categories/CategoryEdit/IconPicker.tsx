import { FormControl, FormLabel, BoxProps, Icon, IconButton, SimpleGrid } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { CategoryEditFormValues } from "./CategoryEdit"

import { icons } from "../../../shared/iconUtils"

interface IconPickerProps {}

const IconPicker = ({}: IconPickerProps) => {
  const { control } = useFormContext<CategoryEditFormValues>()
  return (
    <Controller
      name="icon"
      control={control}
      render={({ field }) => (
        <FormControl>
          <FormLabel fontSize="sm" color="gray.500">
            Icon
          </FormLabel>
          <SimpleGrid spacing={5} minChildWidth="2rem">
            {Object.keys(icons).map(icon => (
              <IconBox
                key={icon}
                icon={icon}
                onIconClick={field.onChange}
                active={field.value === icon}
              />
            ))}
          </SimpleGrid>
        </FormControl>
      )}
    />
  )
}

export default IconPicker

interface IconBoxProps extends BoxProps {
  icon: string
  onIconClick: (icon: string) => void
  active: boolean
}
const IconBox = ({ icon, onIconClick, active = false }: IconBoxProps) => {
  function onClick() {
    onIconClick(icon)
  }
  return (
    <IconButton
      w={12}
      h={12}
      aria-label="choose icon"
      isRound
      colorScheme={active ? "purple" : "gray"}
      icon={<Icon as={icons[icon]} w={7} h={7} color={active ? "white" : "gray.400"} />}
      onClick={onClick}
    />
  )
}
