import { useToast } from "@chakra-ui/react"
import { ActionMeta, MultiValue } from "react-select"
import { CellProps } from "react-table"
import { useSWRConfig } from "swr"
import axios, { AxiosError } from "axios"

import { memo, PropsWithChildren } from "react"
import { Category } from ".prisma/client"
import { TransactionWithCategories } from "../../../types/types"
import CategorySelect from "../../CategorySelect/CategorySelect"

// https://react-select.com/components

interface CategoryRendererProps
  extends PropsWithChildren<CellProps<TransactionWithCategories, Category[]>> {
  categories: Category[]
}

const CategoryRenderer = memo(
  ({ row, value, categories }: CategoryRendererProps) => {
    const toast = useToast()
    const { mutate } = useSWRConfig()

    function onChangeSelect(val: MultiValue<Category>, actionMeta: ActionMeta<Category>) {
      axios
        .post<{ data: TransactionWithCategories }>(
          "/api/transactions/updateTransactionCategories",
          {
            id: row.original.id,
            categoriesConnect:
              actionMeta.action === "select-option" ? [actionMeta.option?.id] : undefined,
            categoriesDisconnect:
              actionMeta.action === "deselect-option" ? [actionMeta.option?.id] : undefined,
          }
        )
        .then(res => {
          toast({
            title: `Updated your Transaction!`,
            status: "success",
          })

          // ! causes performance issues
          const updatedTransaction = res.data.data
          mutate(
            `/api/transactions/getTransactions`,
            async (transactions: { data: TransactionWithCategories[] }) => {
              const index = transactions.data.findIndex(val => val.id === updatedTransaction.id)
              const updatedData = [...transactions.data]
              updatedData[index] = updatedTransaction
              // return transactions
              return { data: updatedData }
            },
            false
          )
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't update your transaction: ${error.response.data.error}`,
              status: "error",
            })
          }
        })
    }

    return <CategorySelect categories={categories} value={value} onChange={onChangeSelect} />
  },
  (prev, post) => prev.value !== post.value
)
CategoryRenderer.displayName = "CategoryRenderer"
export default CategoryRenderer
