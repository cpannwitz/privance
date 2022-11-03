import axios, { AxiosError } from 'axios'
import { Category, Prisma } from '.prisma/client'
import { useSnackbar } from 'notistack'

import CategoryEdit from './CategoryEdit/CategoryEdit'

interface CategoryAddStandaloneProps {
  onAddCategory: (category: Category | null) => void
  onClose: () => void
}

const CategoryAddStandalone = ({ onAddCategory, onClose }: CategoryAddStandaloneProps) => {
  const { enqueueSnackbar } = useSnackbar()

  function onSaveAddEdit(category: Prisma.CategoryUncheckedCreateInput) {
    axios
      .post('/api/categories/upsertCategory', category)
      .then(res => {
        const category = res.data.data
        enqueueSnackbar(`Added or updated your category!`, {
          variant: 'success'
        })
        onAddCategory(category)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          enqueueSnackbar(`Couldn't add/update your category: ${error.response.data.error}`, {
            variant: 'error'
          })
        }
        onAddCategory(null)
      })
  }

  return <CategoryEdit onSave={onSaveAddEdit} onCancel={onClose} />
}

export default CategoryAddStandalone
