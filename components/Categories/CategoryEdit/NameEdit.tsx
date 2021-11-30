import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { ChangeEventHandler } from "react"

interface NameEditProps {
  nameValue: string
  setNameValue: (name: string) => void
}

const NameEdit = ({ nameValue, setNameValue }: NameEditProps) => {
  const onChangeName: ChangeEventHandler<HTMLInputElement> = e => {
    setNameValue(e.target.value)
  }
  return (
    <FormControl isRequired>
      <FormLabel fontSize="sm" color="gray.500">
        Name
      </FormLabel>
      <Input value={nameValue} onChange={onChangeName} required />
    </FormControl>
  )
}

export default NameEdit
