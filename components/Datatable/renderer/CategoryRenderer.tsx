import {
  AvatarGroup,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react"
import Select, { ActionMeta, MultiValue } from "react-select"
import { CellProps } from "react-table"
import { useSWRConfig } from "swr"
import axios, { AxiosError } from "axios"

import { memo, PropsWithChildren } from "react"
import { Category } from ".prisma/client"
import { TransactionWithCategories } from "../../../types/types"
import { icons } from "../../../shared/iconUtils"

// https://react-select.com/components

interface CategoryRendererProps
  extends PropsWithChildren<CellProps<TransactionWithCategories, Category[]>> {
  categories: Category[]
}

const CategoryRenderer = memo(
  ({ row, value, categories }: CategoryRendererProps) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
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
        .then(() => {
          toast({
            title: `Updated your Transaction!`,
            status: "success",
          })
          // const updatedTransaction = res.data.data

          // ! causes performance issues
          // mutate(
          //   `/api/transactions/getTransactions`,
          //   async (transactions: { data: TransactionWithCategories[] }) => {
          //     const index = transactions.data.findIndex(val => val.id === updatedTransaction.id)
          //     const updatedData = [...transactions.data]
          //     updatedData[index] = updatedTransaction
          //     // return transactions
          //     return { data: updatedData }
          //     // const filteredTransactions = transactions.data.filter(
          //     //   tr => tr.id !== updatedTransaction.id
          //     // )
          //     // return { data: [...filteredTransactions, updatedTransaction] }
          //   },
          //   false
          // )
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
    return (
      <Popover isOpen={isOpen} onClose={onClose} isLazy>
        <PopoverTrigger>
          {value.length <= 0 ? (
            <Text fontSize="sm" color="gray.400" onClick={onOpen}>
              Not categorized
            </Text>
          ) : (
            <AvatarGroup onClick={onOpen}>
              {value.map(cat => (
                <Avatar
                  key={cat.id}
                  bg={cat.color || "gray.300"}
                  size="md"
                  icon={<Icon as={cat.icon ? icons[cat.icon] : undefined} color="white" />}
                />
              ))}
            </AvatarGroup>
          )}
        </PopoverTrigger>
        <PopoverContent maxW="12rem">
          <Select
            isSearchable
            autoFocus
            isMulti
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            options={categories}
            getOptionValue={cat => cat.name}
            getOptionLabel={cat => cat.name}
            defaultValue={value}
            onChange={onChangeSelect}
            isClearable={false}
            closeMenuOnSelect={false}
            menuIsOpen={isOpen}
            placeholder="Search..."
            //  styles={{
            //    multiValueLabel: (base, { data, index }) => ({
            //      ...base,
            //      backgroundColor: data.color || undefined,
            //    }),
            //  }}
            components={
              {
                //  ValueContainer,
                // MultiValueContainer,
                //  MultiValueLabel,
                //  MultiValueRemove,
                //  Option,
                //  Input: () => <></>,
                // Menu,
              }
            }
          />
        </PopoverContent>
      </Popover>
    )
  },
  (prev, post) => prev.value !== post.value
)
CategoryRenderer.displayName = "CategoryRenderer"
export default CategoryRenderer
