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
import { SubmitHandler } from "react-hook-form"

import CategoryEditForm, { CategoryEditFormValues } from "./CategoryForm"
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
  const onFormSubmit: SubmitHandler<CategoryEditFormValues> = data => {
    onSave({
      ...formValue,
      name: data.name ?? null,
      color: data.color ?? null,
      icon: data.icon ?? null,
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
        <CategoryEditForm onSubmit={onFormSubmit}>
          <ModalHeader>Customize category</ModalHeader>
          <ModalCloseButton onClick={onCancel} />
          <ModalBody>
            <VStack spacing={5}>
              <NameEdit />
              <ColorPicker />
              <IconPicker />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" size="sm" mr={3} onClick={onCancel}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="blue" type="submit">
              Save
            </Button>
          </ModalFooter>
        </CategoryEditForm>
      </ModalContent>
    </Modal>
  )
}

export default CategoryAddEdit
