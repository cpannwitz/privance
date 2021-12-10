import {
  AvatarGroup,
  Avatar,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Button,
  useColorMode,
} from "@chakra-ui/react"
import Select, { ActionMeta, components, GroupBase, MultiValue, OptionProps } from "react-select"

import { Category } from ".prisma/client"
import { icons } from "../../shared/iconUtils"
import PlaceholderIcon from "remixicon-react/MoneyEuroCircleLineIcon"
import IdeaIcon from "remixicon-react/AddCircleLineIcon"

interface CategorySelectProps {
  value: Category[]
  categories: Category[]
  onChange: (val: MultiValue<Category>, actionMeta: ActionMeta<Category>) => void
  isLoading?: boolean
  isDisabled?: boolean
  avatarGroupLength?: number
  emptyDisplaySize?: "small" | "big"
}

const emptyDisplayColor = {
  small: {
    default: "gray.300",
    dark: "gray.600",
  },
  big: {
    default: "gray.600",
    dark: "gray.400",
  },
}

const CategorySelect = ({
  value,
  categories,
  onChange,
  isLoading = false,
  isDisabled = false,
  avatarGroupLength = 3,
  emptyDisplaySize = "small",
}: CategorySelectProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return (
    <Popover isOpen={isOpen} onClose={onClose} isLazy placement="bottom-start">
      <PopoverTrigger>
        {!value || value.length < 1 ? (
          <Button
            colorScheme="gray"
            color={
              isDark
                ? emptyDisplayColor[emptyDisplaySize].dark
                : emptyDisplayColor[emptyDisplaySize].default
            }
            variant="ghost"
            onClick={onOpen}
            size={emptyDisplaySize === "small" ? "sm" : "md"}
            leftIcon={<Icon as={IdeaIcon} boxSize={4} />}
          >
            Categories
          </Button>
        ) : (
          <AvatarGroup onClick={onOpen} max={avatarGroupLength}>
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
          isLoading={isLoading}
          isDisabled={isDisabled}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          options={categories}
          getOptionValue={cat => cat.name}
          getOptionLabel={cat => cat.name}
          defaultValue={value}
          onChange={onChange}
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
}

export default CategorySelect

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
