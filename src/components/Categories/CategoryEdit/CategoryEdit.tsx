import { Category, Prisma } from '@prisma/client'
import { SubmitHandler } from 'react-hook-form'

import ColorPicker from './ColorPicker'
import IconPicker from './IconPicker'
import NameEdit from './NameEdit'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import FormWrapper from '../../FormWrapper/FormWrapper'
import OpenModal from '../../OpenModal/OpenModal'

export interface CategoryEditFormValues {
  name: string
  color: string
  icon: string
}

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
      icon: data.icon ?? null
    })
  }

  const defaultValues = {
    name: formValue?.name ?? '',
    color: formValue?.color ?? '',
    icon: formValue?.icon ?? ''
  }

  return (
    <OpenModal
      onCancel={onCancel}
      footerChildren={
        <>
          <Button variant="text" sx={{ marginRight: '1rem' }} onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" form="CategoryEditForm">
            Save
          </Button>
        </>
      }
    >
      <FormWrapper<CategoryEditFormValues>
        formId="CategoryEditForm"
        onSubmit={onFormSubmit}
        defaultValues={defaultValues}
      >
        <Stack spacing={5}>
          <Typography variant="h6">Create New Category</Typography>
          <NameEdit />
          <ColorPicker />
          <IconPicker />
        </Stack>
      </FormWrapper>
    </OpenModal>
  )
}

export default CategoryAddEdit
