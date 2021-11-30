import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
} from "@chakra-ui/react"
import { Category, Prisma } from ".prisma/client"
import { useState } from "react"

import ColorPicker from "./ColorPicker"
import IconPicker from "./IconPicker"
import NameEdit from "./NameEdit"

interface CategoryAddEditProps {
  onSave: (category: Prisma.CategoryUncheckedCreateInput) => void
  onCancel: () => void
  formValue?: Category
}

// https://github.com/casesandberg/react-color

const CategoryAddEdit = ({ onSave, onCancel, formValue }: CategoryAddEditProps) => {
  const [colorValue, setColorValue] = useState(formValue?.color ?? "")
  const [iconValue, setIconValue] = useState(formValue?.icon ?? "")
  const [nameValue, setNameValue] = useState(formValue?.name ?? "")

  function onSaveCategory() {
    onSave({
      ...formValue,
      name: nameValue ?? null,
      color: colorValue ?? null,
      icon: iconValue ?? null,
    })
  }

  return (
    <Modal
      size="xl"
      isCentered
      onClose={onCancel}
      onEsc={onCancel}
      isOpen={true}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customize category</ModalHeader>
        <ModalCloseButton onClick={onCancel} />
        <ModalBody>
          <VStack spacing={5}>
            <NameEdit nameValue={nameValue} setNameValue={setNameValue} />
            <ColorPicker colorValue={colorValue} setColor={setColorValue} />
            <IconPicker iconValue={iconValue} setIcon={setIconValue} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" size="sm" mr={3} onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" colorScheme="blue" onClick={onSaveCategory}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CategoryAddEdit
