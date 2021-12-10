import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useSWRConfig } from "swr"
import {
  useToast,
  SimpleGrid,
  HStack,
  IconButton,
  Heading,
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

import AutomationEdit from "./AutomationEdit/AutomationEdit"
import { AutomationRuleWithCategories } from "../../types/types"
// import { TransactionRuleFields } from "../../types/types"

interface AutomationListProps {
  data: AutomationRuleWithCategories[]
}

const AutomationList = ({ data }: AutomationListProps) => {
  const toast = useToast()
  const [editedAutomationRule, setEditedAutomationRule] =
    useState<AutomationRuleWithCategories | null>(null)

  // function onAddCategory() {
  //   setEditedCategory({} as Category)
  // }

  // function onEditCategory(category: Category) {
  //   setEditedCategory(category)
  // }

  // function onCloseAddEdit() {
  //   setEditedCategory(null)
  // }

  // function onSaveAddEdit(category: Prisma.CategoryUncheckedCreateInput) {
  //   if (editedCategory) {
  //     axios
  //       .post("/api/categories/upsertCategory", category)
  //       .then(() => {
  //         toast({
  //           title: `Added or updated your category!`,
  //           status: "success",
  //         })
  //       })
  //       .catch((error: AxiosError) => {
  //         if (error.response) {
  //           toast({
  //             title: `Couldn't add/update your category: ${error.response.data.error}`,
  //             status: "error",
  //           })
  //         }
  //       })
  //       .finally(() => {
  //         mutate(`/api/categories/getCategories`)
  //         setEditedCategory(null)
  //       })
  //   }
  // }

  // function onDeleteCategory(category: Category) {
  //   if (category?.id) {
  //     axios
  //       .delete("/api/categories/deleteCategory", { params: { id: category.id } })
  //       .then(() => {
  //         toast({
  //           title: `Deleted your Category!`,
  //           status: "success",
  //         })
  //       })
  //       .catch((error: AxiosError) => {
  //         if (error.response) {
  //           toast({
  //             title: `Couldn't delete your category: ${error.response.data.error}`,
  //             status: "error",
  //           })
  //         }
  //       })
  //       .finally(() => {
  //         mutate(`/api/categories/getCategories`)
  //       })
  //   }
  // }

  return (
    <>
      {/* {editedAutomationRule && <AutomationEdit />} */}
      {true && <AutomationEdit onSave={() => {}} onCancel={() => {}} />}
      <Box w="100%" mb={5}>
        <Button
          isFullWidth
          size="lg"
          colorScheme="blue"
          leftIcon={<Icon as={AddIcon} color="white" w={7} h={7} />}
          // onClick={onAddCategory}
        >
          Add Automation Rule
        </Button>
      </Box>
      {/* // here goes the list of AutomationRules */}
    </>
  )
}

export default AutomationList
