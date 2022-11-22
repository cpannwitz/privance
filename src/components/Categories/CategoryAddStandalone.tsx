import { Category, Prisma } from '@prisma/client'

import CategoryEdit from './CategoryEdit/CategoryEdit'
import { useUpsertCategory } from '../ApiSystem/api/categories'

interface CategoryAddStandaloneProps {
  onAddCategory: (category: Category | null) => void
  onClose: () => void
}

const CategoryAddStandalone = ({ onAddCategory, onClose }: CategoryAddStandaloneProps) => {
  const { mutateAsync: upsertCategory } = useUpsertCategory()

  function onSaveAddEdit(category: Prisma.CategoryUncheckedCreateInput) {
    upsertCategory(category)
      .then(newCategory => onAddCategory(newCategory))
      .catch(() => onAddCategory(null))
  }

  return <CategoryEdit onSave={onSaveAddEdit} onCancel={onClose} />
}

export default CategoryAddStandalone
