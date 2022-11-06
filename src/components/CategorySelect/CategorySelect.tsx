import { useState } from 'react'
import { Category } from '@prisma/client'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import SvgIcon from '@mui/material/SvgIcon'
import ClickAwayListener from '@mui/material/ClickAwayListener'

import { useTheme } from '@mui/material/styles'

import Select, { ActionMeta, components, GroupBase, MenuListProps, OptionProps } from 'react-select'

import { icons, placeholderIcon } from '../../shared/iconUtils'
import useGetCategories from '../hooks/useGetCategories'
import CategoryAddStandalone from '../Categories/CategoryAddStandalone'

interface CategorySelectProps {
  value?: Category | null
  onChange: (option: Category | null, actionMeta?: ActionMeta<Category>) => void
}

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const { data: categories, isError, isLoading } = useGetCategories()

  const {
    palette: { mode }
  } = useTheme()
  const isDark = mode === 'dark'

  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const toggleIsSelectOpen = () => setIsSelectOpen(state => !state)
  const setSelectOpenFalse = () => setIsSelectOpen(false)

  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const toggleSetIsAddingCategory = () => setIsAddingCategory(!isAddingCategory)

  function onCloseAddCategory() {
    setIsAddingCategory(false)
  }
  function onAddCategory(category: Category | null) {
    if (category) {
      onChange(category)
      setIsAddingCategory(false)
    } else {
      onCloseAddCategory()
    }
  }

  return (
    <>
      {isAddingCategory ? (
        <CategoryAddStandalone onClose={onCloseAddCategory} onAddCategory={onAddCategory} />
      ) : null}

      {/* // TODO: Extract into own comp */}
      <Chip
        label={value?.name ?? 'Choose Category'}
        icon={value?.icon ? icons[value.icon] : placeholderIcon}
        onClick={toggleIsSelectOpen}
        sx={{
          backgroundColor: value?.color || '#bbbbbb',
          color: 'white',
          '& .MuiChip-icon': { color: 'white' }
        }}
      />

      {isSelectOpen && (
        <ClickAwayListener onClickAway={setSelectOpenFalse}>
          <Select<Category>
            isSearchable
            autoFocus
            // isMulti={false}
            isLoading={isLoading}
            isDisabled={isError}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            options={categories}
            getOptionValue={cat => cat.name}
            getOptionLabel={cat => cat.name}
            defaultValue={value}
            value={value}
            onChange={onChange}
            isClearable={true}
            closeMenuOnSelect={true}
            menuIsOpen={isSelectOpen}
            placeholder="Search..."
            menuPortalTarget={document.body}
            styles={{
              menuPortal: base => ({ ...base, zIndex: 9999 }),
              container: base => ({ ...base, position: 'absolute' }),
              control: base => ({
                ...base,
                width: '14rem'
              }),
              option: base => ({
                ...base,
                display: 'flex',
                alignItems: 'center',
                color: 'inherit'
              }),
              menu: base => ({
                ...base,
                margin: 0
              }),
              menuList: base => ({
                ...base,
                padding: 0
              })
            }}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                ...(isDark ? darkColors : lightColors)
              }
            })}
            components={{
              DropdownIndicator: null,
              IndicatorSeparator: null,
              Option: SelectOption,
              MenuList: props => <SelectMenuList onClick={toggleSetIsAddingCategory} {...props} />
            }}
          />
        </ClickAwayListener>
      )}
    </>
  )
}

export default CategorySelect

const SelectOption = ({
  children,
  data,
  ...props
}: OptionProps<Category, false, GroupBase<Category>>) => {
  return (
    <components.Option {...props} data={data}>
      <SvgIcon htmlColor={data.color || undefined}>
        {data.icon ? icons[data.icon] : placeholderIcon}
        {children}
      </SvgIcon>
      <Typography sx={{ ml: 1 }}>{data.name}</Typography>
    </components.Option>
  )
}

const SelectMenuList = (
  props: MenuListProps<Category, false, GroupBase<Category>> & { onClick: () => void }
) => {
  return (
    <components.MenuList {...props}>
      {props.children}
      <Button fullWidth color="primary" size="small" onClick={props.onClick}>
        Add new category
      </Button>
    </components.MenuList>
  )
}

const darkColors = {
  primary: 'hsla(225, 73%, 57%, 0.6)',
  primary75: 'hsla(225, 73%, 57%, 0.5)',
  primary50: 'hsla(225, 73%, 57%, 0.3)',
  primary25: 'hsla(225, 73%, 57%, 0.2)',
  neutral90: 'hsl(0, 0%, 100%)',
  neutral80: 'hsl(0, 0%, 95%)',
  neutral70: 'hsl(0, 0%, 90%)',
  neutral60: 'hsl(0, 0%, 80%)',
  neutral50: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral30: 'hsl(0, 0%, 50%)',
  neutral20: 'hsl(0, 0%, 40%)',
  neutral10: 'hsl(0, 0%, 30%)',
  neutral5: 'hsl(0, 0%, 20%)',
  neutral0: 'hsl(0, 0%, 10%)'
}

const lightColors = {
  primary: 'hsla(225, 73%, 57%, 0.4)',
  primary75: 'hsla(225, 73%, 57%, 0.3)',
  primary50: 'hsla(225, 73%, 57%, 0.2)',
  primary25: 'hsla(225, 73%, 57%, 0.1)',
  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
}
