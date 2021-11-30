import { FormControl, FormLabel, BoxProps, Icon, IconButton, SimpleGrid } from "@chakra-ui/react"

import { icons } from "../../../shared/iconUtils"

interface IconPickerProps {
  iconValue: string
  setIcon: (icon: string) => void
}

const IconPicker = ({ iconValue, setIcon }: IconPickerProps) => {
  return (
    <FormControl>
      <FormLabel fontSize="sm" color="gray.500">
        Icon
      </FormLabel>
      <SimpleGrid spacing={5} minChildWidth="2rem">
        {Object.keys(icons).map(icon => (
          <IconBox key={icon} icon={icon} onIconClick={setIcon} active={iconValue === icon} />
        ))}
      </SimpleGrid>
    </FormControl>
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
