import { useState } from 'react'
import axios, { type AxiosError } from 'axios'
import type { Category, Transaction, Prisma } from '.prisma/client'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import { useSnackbar } from 'notistack'

import EditIcon from '@mui/icons-material/EditOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'

import CategoryEdit from './CategoryEdit/CategoryEdit'
import DataIsEmpty from '../DataStates/DataIsEmpty'
import { icons, placeholderIcon } from '../../shared/iconUtils'
import type { CategoriesStatistics, CategoryWithTransactions } from '../../types/types'
import useGetCategoriesTransactions from '../hooks/useGetCategoriesTransactions'

const getTransactionsBalance = (transactions: Transaction[]) =>
  Math.abs(transactions.reduce((sum, t) => (sum += t.amount || 0), 0))

interface CategoryListProps {
  categories: CategoryWithTransactions[]
  categoriesStatistics: CategoriesStatistics
}

const CategoryList = ({ categories, categoriesStatistics }: CategoryListProps) => {
  const { mutate: mutateCategories } = useGetCategoriesTransactions()

  const { allTransactionsCount, uncategorizedTransactionsCount } = categoriesStatistics
  const { enqueueSnackbar } = useSnackbar()
  const [editedCategory, setEditedCategory] = useState<Category | undefined>(undefined)

  function onAddCategory() {
    setEditedCategory({} as Category)
  }

  function onEditCategory(category: Category) {
    setEditedCategory(category)
  }

  function onCloseAddEdit() {
    setEditedCategory(undefined)
  }

  function onSaveAddEdit(category: Prisma.CategoryUncheckedCreateInput) {
    if (editedCategory) {
      axios
        .post('/api/categories/upsertCategory', category)
        .then(() => {
          enqueueSnackbar(`Added or updated your category!`, {
            variant: 'success'
          })
        })
        .catch((error: AxiosError<any>) => {
          if (error.response) {
            enqueueSnackbar(`Couldn't add/update your category: ${error.response.data.error}`, {
              variant: 'error'
            })
          }
        })
        .finally(() => {
          mutateCategories()
          setEditedCategory(undefined)
        })
    }
  }

  function onDeleteCategory(category: Category) {
    if (category?.id) {
      axios
        .delete('/api/categories/deleteCategory', {
          params: { id: category.id }
        })
        .then(() => {
          enqueueSnackbar(`Deleted your Category!`, {
            variant: 'success'
          })
        })
        .catch((error: AxiosError<any>) => {
          if (error.response) {
            enqueueSnackbar(`Couldn't delete your category: ${error.response.data.error}`, {
              variant: 'error'
            })
          }
        })
        .finally(() => {
          mutateCategories()
        })
    }
  }

  return (
    <>
      {editedCategory && (
        <CategoryEdit onSave={onSaveAddEdit} onCancel={onCloseAddEdit} formValue={editedCategory} />
      )}
      <Box sx={{ width: '100%', mb: 5 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddCategory}
        >
          Add Category
        </Button>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography>
          You currently have <b>{uncategorizedTransactionsCount}</b> (of {allTransactionsCount})
          uncategorized transactions.
        </Typography>
      </Box>

      {categories.length <= 0 ? (
        <DataIsEmpty />
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={3}
          sx={{ pb: 5 }}
        >
          {categories
            .sort(
              (cA, cB) =>
                getTransactionsBalance(cB.transactions) - getTransactionsBalance(cA.transactions)
            )
            .map(category => (
              <CategoryListItem
                key={category.name}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
                category={category}
              />
            ))}
        </Grid>
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
    <Grid item xs>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 3,
          boxShadow: 1,
          borderRadius: 5,
          minWidth: '26rem'
        }}
      >
        <Avatar sx={{ bgcolor: color || 'grey.100', mr: 2 }}>
          <SvgIcon htmlColor="white">{icon ? icons[icon] : placeholderIcon}</SvgIcon>
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontSize={20}>{name}</Typography>
          <Typography color="GrayText" fontSize={16}>
            {getTransactionsBalance(category.transactions)} €
          </Typography>
          <Typography color="GrayText" fontSize={14}>
            {category._count.transactions} transactions
          </Typography>
        </Box>

        <Box sx={{ ml: 'auto' }}>
          <IconButton
            aria-label="delete category"
            onClick={onDeleteCategory}
            sx={{ color: 'grey.400' }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit category"
            onClick={onEditCategory}
            sx={{ color: 'grey.400' }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
    </Grid>
  )
}
