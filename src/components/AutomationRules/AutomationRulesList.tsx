import { useState } from 'react'
import axios, { type AxiosError } from 'axios'

import type { Prisma, Category } from '@prisma/client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Badge from '@mui/material/Badge'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

import UploadIcon from '@mui/icons-material/FileUploadOutlined'
import NegativeIcon from '@mui/icons-material/CancelOutlined'
import PositiveIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import PlayIcon from '@mui/icons-material/PlayArrowOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { useNotification } from '../NotificationSystem/useNotification'
import AutomationRulesEdit from './AutomationRulesEdit/AutomationRulesEdit'
import type { AutomationRuleWithCategory, CategoryWithAutomationRules } from '../../types/types'
import DataIsEmpty from '../DataStates/DataIsEmpty'
import { icons, placeholderIcon } from '../../shared/iconUtils'

import { useRouter } from 'next/router'

import useGetAutomationRulesByCategory from '../hooks/useGetAutomationRulesByCategory'

interface AutomationRulesListProps {
  data: CategoryWithAutomationRules[]
}

const AutomationRulesList = ({ data }: AutomationRulesListProps) => {
  const { mutate: mutateAutomationRules } = useGetAutomationRulesByCategory()
  const { notify } = useNotification()

  const [editedAutomationRule, setEditedAutomationRule] =
    useState<AutomationRuleWithCategory | null>(null)

  function onAddAutomationRule() {
    setEditedAutomationRule({} as AutomationRuleWithCategory)
  }

  function onEditAutomationRule(automationRule: AutomationRuleWithCategory) {
    setEditedAutomationRule(automationRule)
  }

  function onCloseAddEdit() {
    setEditedAutomationRule(null)
  }

  // TODO: badly needs better structure / external api requests
  function onSaveAddEdit(automationRule: AutomationRuleWithCategory) {
    if (!automationRule.id) {
      const automationRuleCreateInput: Prisma.AutomationRuleCreateInput = {
        ...automationRule,
        category: { connect: { id: automationRule.category.id } }
      }
      axios
        .post('/api/automationrules/addAutomationRule', automationRuleCreateInput)
        .then(() => {
          notify(`Added or updated your automation rule!`, 'success')
        })
        .catch((error: AxiosError<any>) => {
          if (error.response) {
            notify(
              `Couldn't add/update your automation rule: ${error.response.data.error}`,
              'error'
            )
          }
        })
        .finally(() => {
          mutateAutomationRules()
          setEditedAutomationRule(null)
        })
    } else {
      const automationRuleUpdateInput: Prisma.AutomationRuleUpdateInput &
        Prisma.AutomationRuleWhereUniqueInput = {
        ...automationRule,
        category: { connect: { id: automationRule.categoryId } }
      }
      axios
        .post('/api/automationrules/updateAutomationRule', automationRuleUpdateInput)
        .then(() => {
          notify(`Added or updated your automation rule!`, 'success')
        })
        .catch((error: AxiosError<any>) => {
          if (error.response) {
            notify(
              `Couldn't add/update your automation rule: ${error.response.data.error}`,
              'error'
            )
          }
        })
        .finally(() => {
          mutateAutomationRules()
          setEditedAutomationRule(null)
        })
    }
  }

  // TODO: badly needs external api requests
  function onDeleteAutomationRule(automationRule: AutomationRuleWithCategory) {
    if (automationRule?.id) {
      axios
        .delete('/api/automationrules/deleteAutomationRule', {
          params: { id: automationRule.id }
        })
        .then(() => {
          notify(`Deleted your Automation Rule!`, 'success')
        })
        .catch((error: AxiosError<any>) => {
          if (error.response) {
            notify(`Couldn't delete your automation rule: ${error.response.data.error}`, 'error')
          }
        })
        .finally(() => {
          mutateAutomationRules()
        })
    }
  }

  function onToggleAutomationRuleOnUploadRun(automationRule: AutomationRuleWithCategory) {
    if (automationRule?.id) {
      // TODO: better removal of unused property
      const { categoryId, ...automationRuleSafe } = automationRule
      const automationRuleUpdateInput: Prisma.AutomationRuleUpdateInput &
        Prisma.AutomationRuleWhereUniqueInput = {
        ...automationRuleSafe,
        category: {
          connect: { id: automationRule.category.id }
        },
        activeOnUpload: !automationRule.activeOnUpload
      }
      axios
        .post('/api/automationrules/updateAutomationRule', automationRuleUpdateInput)
        .then(() => {
          notify(`Updated your automation rule!`, 'success')
        })
        .catch((error: AxiosError<any>) => {
          if (error.response) {
            notify(`Couldn't update your automation rule: ${error.response.data.error}`, 'error')
          }
        })
        .finally(() => {
          mutateAutomationRules()
          setEditedAutomationRule(null)
        })
    }
  }

  const router = useRouter()
  function onRunAutomationRule(automationRule: AutomationRuleWithCategory) {
    router.push({
      pathname: `/automationruleapply`,
      query: {
        rule: automationRule.id
      }
    })
  }

  return (
    <>
      {editedAutomationRule && (
        <AutomationRulesEdit
          onSave={onSaveAddEdit}
          onCancel={onCloseAddEdit}
          formValue={editedAutomationRule}
        />
      )}
      <Box sx={{ width: '100%', mb: 4 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddAutomationRule}
        >
          Add Automation Rule
        </Button>
      </Box>
      {data.length < 1 ? (
        <DataIsEmpty />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', '& > *': { mb: 3 } }}>
          {data.map(automationRuleCategory => {
            const { automationRules, ...category } = automationRuleCategory
            return (
              <AutomationRulesCategory key={automationRuleCategory.id} category={category}>
                <List dense={true} sx={{ width: '100%' }}>
                  {automationRules.map(automationRule => (
                    <AutomationRuleListItem
                      key={automationRule.id}
                      onRun={onRunAutomationRule}
                      onEdit={onEditAutomationRule}
                      onDelete={onDeleteAutomationRule}
                      onToggleOnUploadRun={onToggleAutomationRuleOnUploadRun}
                      automationRule={automationRule}
                    />
                  ))}
                </List>
              </AutomationRulesCategory>
            )
          })}
        </Box>
      )}
    </>
  )
}

export default AutomationRulesList
interface AutomationRulesCategoryProps {
  children?: React.ReactNode
  category: Category
}
const AutomationRulesCategory = ({ children, category }: AutomationRulesCategoryProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        boxShadow: 2,
        borderRadius: 2,
        '& > *': { mr: 2 }
      }}
    >
      <Chip
        label={category.name}
        icon={category.icon ? icons[category.icon] : placeholderIcon}
        sx={{
          backgroundColor: category.color || undefined,
          color: 'white',
          '& .MuiChip-icon': { color: 'white' }
        }}
      />

      {children}
    </Box>
  )
}

interface AutomationRuleProps {
  onRun: (automationRule: AutomationRuleWithCategory) => void
  onEdit: (automationRule: AutomationRuleWithCategory) => void
  onDelete: (automationRule: AutomationRuleWithCategory) => void
  onToggleOnUploadRun: (automationRule: AutomationRuleWithCategory) => void
  automationRule: AutomationRuleWithCategory
}
const AutomationRuleListItem = ({
  onRun,
  onEdit,
  onDelete,
  onToggleOnUploadRun,
  automationRule
}: AutomationRuleProps) => {
  function onEditAutomationRule() {
    onEdit(automationRule)
  }
  function onDeleteAutomationRule() {
    onDelete(automationRule)
  }
  function onRunAutomationRule() {
    onRun(automationRule)
  }
  function onToggleAutomationRuleRunOnUpload() {
    onToggleOnUploadRun(automationRule)
  }
  return (
    <ListItem>
      <ListItemText primary={automationRule.value} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="toggle run on upload"
          onClick={onToggleAutomationRuleRunOnUpload}
          sx={{ color: 'grey.400' }}
        >
          <Badge
            badgeContent={
              automationRule.activeOnUpload ? (
                <PositiveIcon color="success" sx={{ width: '16px', height: '16px' }} />
              ) : (
                <NegativeIcon color="error" sx={{ width: '16px', height: '16px' }} />
              )
            }
          >
            <UploadIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-label="delete automation rule"
          onClick={onDeleteAutomationRule}
          sx={{ color: 'grey.400' }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="edit automation rule"
          onClick={onEditAutomationRule}
          sx={{ color: 'grey.400' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="run automation rule"
          onClick={onRunAutomationRule}
          sx={{ color: 'grey.400' }}
        >
          <PlayIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
