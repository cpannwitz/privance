import { useState } from 'react'
import { Prisma } from '@prisma/client'

import AutomationRulesEdit from './AutomationRulesEdit/AutomationRulesEdit'
import { AutomationRuleWithCategory } from '../../types/types'

import IconButton from '@mui/material/IconButton'
import AutomationRuleIcon from '@mui/icons-material/MotionPhotosAutoOutlined'
import { useUpsertAutomationRule } from '../ApiSystem/api/automationrules'

interface AutomationRuleAddStandaloneProps {
  onAddAutomationRule?: (automationRule: AutomationRuleWithCategory | null) => void
  onClose?: () => void
  initialValue?: string
}

const AutomationRuleAddStandalone = ({
  onAddAutomationRule,
  onClose,
  initialValue
}: AutomationRuleAddStandaloneProps) => {
  const { mutateAsync: upsertAutomationRule } = useUpsertAutomationRule()

  function onSaveAddEdit(automationRule: AutomationRuleWithCategory) {
    const data: Prisma.AutomationRuleUncheckedCreateInput = {
      ...automationRule,
      categoryId: automationRule.category.id
    }

    upsertAutomationRule(data)
      .then(() => {
        if (onAddAutomationRule) onAddAutomationRule(automationRule)
      })
      .catch(() => {
        if (onAddAutomationRule) onAddAutomationRule(null)
      })
  }

  const [isActive, setIsActive] = useState(false)
  function toggleIsActive() {
    setIsActive(!isActive)
    if (onClose) onClose()
  }

  return (
    <>
      <IconButton size="small" color="primary" onClick={toggleIsActive}>
        <AutomationRuleIcon />
      </IconButton>
      {isActive && (
        <AutomationRulesEdit
          onSave={onSaveAddEdit}
          onCancel={toggleIsActive}
          formValue={{ value: initialValue || '' }}
        />
      )}
    </>
  )
}

export default AutomationRuleAddStandalone
