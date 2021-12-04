import {
  AvatarGroup,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  useToast,
  Button,
  useColorMode,
} from "@chakra-ui/react"
import Select, { ActionMeta, components, GroupBase, MultiValue, OptionProps } from "react-select"
import { CellProps } from "react-table"
import { useSWRConfig } from "swr"
import axios, { AxiosError } from "axios"

import { memo, PropsWithChildren } from "react"
import { Category } from ".prisma/client"
import { TransactionWithCategories } from "../../../types/types"
import { icons } from "../../../shared/iconUtils"
import PlaceholderIcon from "remixicon-react/MoneyEuroCircleLineIcon"
import IdeaIcon from "remixicon-react/AddCircleLineIcon"

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
    const { colorMode } = useColorMode()
    const isDark = colorMode === "dark"

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

    const SelectOption = ({
      children,
      data,
      ...props
    }: OptionProps<Category, true, GroupBase<Category>>) => {
      return (
        <components.Option {...props} data={data}>
          <Icon
            as={data.icon ? icons[data.icon] : PlaceholderIcon}
            w={7}
            h={7}
            color={data.color || undefined}
            mr={2}
            isTruncated
          />
          {children}
        </components.Option>
      )
    }

    return (
      <Popover isOpen={isOpen} onClose={onClose} isLazy placement="bottom-start">
        <PopoverTrigger>
          {value.length <= 0 ? (
            <Button
              colorScheme="gray"
              color={isDark ? "gray.600" : "gray.300"}
              variant="ghost"
              onClick={onOpen}
              size="sm"
              leftIcon={<Icon as={IdeaIcon} boxSize={4} />}
            >
              Add Cat.
            </Button>
          ) : (
            <AvatarGroup onClick={onOpen} max={3}>
              {value.map(cat => (
                <Avatar
                  boxSize={10}
                  key={cat.id}
                  bg={cat.color || "gray.300"}
                  size="md"
                  icon={
                    <Icon as={cat.icon ? icons[cat.icon] : undefined} color="white" boxSize={6} />
                  }
                  _groupHover={{
                    outline: "2px solid #bbb",
                    cursor: "pointer",
                  }}
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
            styles={{
              option: base => ({
                ...base,
                display: "flex",
                alignItems: "center",
                color: "inherit",
              }),
              menu: base => ({
                ...base,
                margin: 0,
              }),
            }}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                ...(isDark ? darkColors : lightColors),
              },
            })}
            components={{
              DropdownIndicator: null,
              IndicatorSeparator: null,
              Option: SelectOption,
            }}
          />
        </PopoverContent>
      </Popover>
    )
  },
  (prev, post) => prev.value !== post.value
)
CategoryRenderer.displayName = "CategoryRenderer"
export default CategoryRenderer

const darkColors = {
  primary: "hsla(225, 73%, 57%, 0.6)",
  primary75: "hsla(225, 73%, 57%, 0.5)",
  primary50: "hsla(225, 73%, 57%, 0.3)",
  primary25: "hsla(225, 73%, 57%, 0.2)",
  neutral90: "hsl(0, 0%, 100%)",
  neutral80: "hsl(0, 0%, 95%)",
  neutral70: "hsl(0, 0%, 90%)",
  neutral60: "hsl(0, 0%, 80%)",
  neutral50: "hsl(0, 0%, 70%)",
  neutral40: "hsl(0, 0%, 60%)",
  neutral30: "hsl(0, 0%, 50%)",
  neutral20: "hsl(0, 0%, 40%)",
  neutral10: "hsl(0, 0%, 30%)",
  neutral5: "hsl(0, 0%, 20%)",
  neutral0: "hsl(0, 0%, 10%)",
}

const lightColors = {
  primary: "hsla(225, 73%, 57%, 0.4)",
  primary75: "hsla(225, 73%, 57%, 0.3)",
  primary50: "hsla(225, 73%, 57%, 0.2)",
  primary25: "hsla(225, 73%, 57%, 0.1)",
  neutral0: "hsl(0, 0%, 100%)",
  neutral5: "hsl(0, 0%, 95%)",
  neutral10: "hsl(0, 0%, 90%)",
  neutral20: "hsl(0, 0%, 80%)",
  neutral30: "hsl(0, 0%, 70%)",
  neutral40: "hsl(0, 0%, 60%)",
  neutral50: "hsl(0, 0%, 50%)",
  neutral60: "hsl(0, 0%, 40%)",
  neutral70: "hsl(0, 0%, 30%)",
  neutral80: "hsl(0, 0%, 20%)",
  neutral90: "hsl(0, 0%, 10%)",
}
