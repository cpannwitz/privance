import { FormControl, FormLabel } from "@chakra-ui/react"

import { ColorChangeHandler, CirclePicker } from "react-color"

interface ColorPickerProps {
  colorValue: string
  setColor: (color: string) => void
}

// ! Random Color: # + Math.floor(Math.random()*16777215).toString(16);

const ColorPicker = ({ colorValue, setColor }: ColorPickerProps) => {
  const onColorChange: ColorChangeHandler = ({ hex }) => {
    setColor(hex)
  }
  return (
    <FormControl>
      <FormLabel fontSize="sm" color="gray.500">
        Color
      </FormLabel>
      <CirclePicker color={colorValue} onChangeComplete={onColorChange} width="100%" />
    </FormControl>
  )
}

export default ColorPicker
