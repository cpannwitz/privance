import axios, { AxiosError } from "axios"
import { Category, Prisma } from ".prisma/client"
import { useToast } from "@chakra-ui/react"

import CategoryEdit from "./CategoryEdit/CategoryEdit"

interface CategoryAddStandaloneProps {
  onAddCategory: (category: Category | null) => void
  onClose: () => void
}

const CategoryAddStandalone = ({ onAddCategory, onClose }: CategoryAddStandaloneProps) => {
  const toast = useToast()

  function onSaveAddEdit(category: Prisma.CategoryUncheckedCreateInput) {
    axios
      .post("/api/categories/upsertCategory", category)
      .then(res => {
        const category = res.data.data
        toast({
          title: `Added or updated your category!`,
          status: "success",
        })
        onAddCategory(category)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          toast({
            title: `Couldn't add/update your category: ${error.response.data.error}`,
            status: "error",
          })
        }
        onAddCategory(null)
      })
  }

  return <CategoryEdit onSave={onSaveAddEdit} onCancel={onClose} />
}

export default CategoryAddStandalone
