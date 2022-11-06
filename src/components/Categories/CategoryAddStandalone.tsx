import axios, { type AxiosError } from 'axios'
import type { Category, Prisma } from '@prisma/client'

import { useNotification } from '../NotificationSystem/useNotification'
import CategoryEdit from './CategoryEdit/CategoryEdit'

interface CategoryAddStandaloneProps {
  onAddCategory: (category: Category | null) => void
  onClose: () => void
}

const CategoryAddStandalone = ({ onAddCategory, onClose }: CategoryAddStandaloneProps) => {
  const { notify } = useNotification()

  function onSaveAddEdit(category: Prisma.CategoryUncheckedCreateInput) {
    axios
      .post('/api/categories/upsertCategory', category)
      .then(res => {
        const category = res.data.data
        notify(`Added or updated your category!`, 'success')
        onAddCategory(category)
      })
      .catch((error: AxiosError<any>) => {
        if (error.response) {
          notify(`Couldn't add/update your category: ${error.response.data.error}`, 'error')
        }
        onAddCategory(null)
      })
  }

  return <CategoryEdit onSave={onSaveAddEdit} onCancel={onClose} />
}

export default CategoryAddStandalone
