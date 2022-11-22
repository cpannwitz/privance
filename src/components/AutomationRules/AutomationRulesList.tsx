import { useState } from 'react'

import { Category } from '@prisma/client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
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

import AutomationRulesEdit from './AutomationRulesEdit/AutomationRulesEdit'
import { AutomationRuleWithCategory, CategoryWithAutomationRules } from '../../types/types'
import DataIsEmpty from '../DataStates/DataIsEmpty'

import { useDeleteAutomationRule, useUpsertAutomationRule } from '../ApiSystem/api/automationrules'

import { useRouter } from 'next/router'

import CategoryDisplay from '../CategoryDisplay/CategoryDisplay'

interface AutomationRulesListProps {
  data: CategoryWithAutomationRules[]
}

const AutomationRulesList = ({ data: automationRulesByCategory }: AutomationRulesListProps) => {
  const { mutateAsync: upsertAutomationRule } = useUpsertAutomationRule()
  const { mutate: deleteAutomationRule } = useDeleteAutomationRule()

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

  function onSaveAddEdit(automationRule: AutomationRuleWithCategory) {
    const data = {
      ...automationRule,
      category: undefined,
      categoryId: automationRule.category.id
    }

    upsertAutomationRule(data).finally(() => {
      setEditedAutomationRule(null)
    })
  }

  function onDeleteAutomationRule(automationRule: AutomationRuleWithCategory) {
    deleteAutomationRule(automationRule.id)
  }

  function onToggleAutomationRuleOnUploadRun(automationRule: AutomationRuleWithCategory) {
    const data = {
      ...automationRule,
      category: undefined,
      activeOnUpload: !automationRule.activeOnUpload
    }

    upsertAutomationRule(data).finally(() => {
      setEditedAutomationRule(null)
    })
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
      {automationRulesByCategory.length < 1 ? (
        <DataIsEmpty />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', '& > *': { mb: 3 } }}>
          {automationRulesByCategory.map(automationRuleCategory => {
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
      <CategoryDisplay category={category} />

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
