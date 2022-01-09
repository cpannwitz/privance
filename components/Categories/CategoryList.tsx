import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useSWRConfig } from "swr"
import { Category, Transaction, Prisma } from ".prisma/client"
import {
  useToast,
  SimpleGrid,
  Stack,
  IconButton,
  Heading,
  Text,
  Avatar,
  Icon,
  Spacer,
  Box,
  Button,
} from "@chakra-ui/react"

import PlaceholderIcon from "remixicon-react/MoneyEuroCircleLineIcon"
import EditIcon from "remixicon-react/PencilLineIcon"
import AddIcon from "remixicon-react/AddLineIcon"
import DeleteIcon from "remixicon-react/DeleteBin6LineIcon"

import CategoryEdit from "./CategoryEdit/CategoryEdit"
import DataIsEmpty from "../DataStates/DataIsEmpty"
import { icons } from "../../shared/iconUtils"
import { CategoriesStatistics, CategoryWithTransactions } from "../../types/types"

const getTransactionsBalance = (transactions: Transaction[]) =>
  Math.abs(transactions.reduce((sum, t) => (sum += t.amount || 0), 0))

interface CategoryListProps {
  categories: CategoryWithTransactions[]
  categoriesStatistics: CategoriesStatistics
}

const CategoryList = ({ categories, categoriesStatistics }: CategoryListProps) => {
  const { allTransactionsCount, uncategorizedTransactionsCount } = categoriesStatistics
  const { mutate } = useSWRConfig()
  const toast = useToast()
  const [editedCategory, setEditedCategory] = useState<Category | null>(null)

  function onAddCategory() {
    setEditedCategory({} as Category)
  }

  function onEditCategory(category: Category) {
    setEditedCategory(category)
  }

  function onCloseAddEdit() {
    setEditedCategory(null)
  }

  function onSaveAddEdit(category: Prisma.CategoryUncheckedCreateInput) {
    if (editedCategory) {
      axios
        .post("/api/categories/upsertCategory", category)
        .then(() => {
          toast({
            title: `Added or updated your category!`,
            status: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't add/update your category: ${error.response.data.error}`,
              status: "error",
            })
          }
        })
        .finally(() => {
          mutate(`/api/categories/getCategories`)
          setEditedCategory(null)
        })
    }
  }

  function onDeleteCategory(category: Category) {
    if (category?.id) {
      axios
        .delete("/api/categories/deleteCategory", { params: { id: category.id } })
        .then(() => {
          toast({
            title: `Deleted your Category!`,
            status: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't delete your category: ${error.response.data.error}`,
              status: "error",
            })
          }
        })
        .finally(() => {
          mutate(`/api/categories/getCategories`)
        })
    }
  }

  return (
    <>
      {editedCategory && (
        <CategoryEdit onSave={onSaveAddEdit} onCancel={onCloseAddEdit} formValue={editedCategory} />
      )}
      <Box w="100%" mb={5}>
        <Button
          isFullWidth
          size="lg"
          colorScheme="blue"
          leftIcon={<Icon as={AddIcon} color="white" w={7} h={7} />}
          onClick={onAddCategory}
        >
          Add Category
        </Button>
      </Box>
      <Box p={5}>
        <Text as="em">
          You currently have <b>{uncategorizedTransactionsCount}</b> (of {allTransactionsCount})
          uncategorized transactions.
        </Text>
      </Box>

      {categories.length <= 0 ? (
        <DataIsEmpty />
      ) : (
        <SimpleGrid spacing={5} minChildWidth="26rem">
          {categories.map(category => (
            <CategoryListItem
              key={category.name}
              onEdit={onEditCategory}
              onDelete={onDeleteCategory}
              category={category}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  )
}

export default CategoryList

interface CategoryListItemProps {
  category: CategoryWithTransactions
  onEdit: (category: CategoryWithTransactions) => void
  onDelete: (category: CategoryWithTransactions) => void
}

export const CategoryListItem = ({ category, onEdit, onDelete }: CategoryListItemProps) => {
  const { name, color, icon } = category
  function onEditCategory() {
    onEdit(category)
  }
  function onDeleteCategory() {
    onDelete(category)
  }
  return (
    <Stack
      direction="row"
      p={3}
      shadow="md"
      borderWidth="1px"
      align="center"
      spacing={3}
      borderRadius="lg"
    >
      <Avatar
        boxSize={10}
        bg={color || "gray.100"}
        icon={<Icon as={icon ? icons[icon] : PlaceholderIcon} boxSize={6} color="white" />}
      />
      <Stack direction="column">
        <Heading fontSize="md">{name}</Heading>
        <Text color="gray.500" fontSize="sm">
          {getTransactionsBalance(category.transactions)} €
        </Text>
        <Text color="gray.500" fontSize="sm">
          {category._count.transactions} transactions
        </Text>
      </Stack>
      <Spacer />
      <IconButton
        variant="ghost"
        isRound
        aria-label="edit category"
        icon={<Icon as={DeleteIcon} color="gray.300" boxSize={5} />}
        onClick={onDeleteCategory}
      />
      <IconButton
        variant="ghost"
        isRound
        aria-label="edit category"
        icon={<Icon as={EditIcon} color="gray.300" boxSize={5} />}
        onClick={onEditCategory}
      />
    </Stack>
  )
}
