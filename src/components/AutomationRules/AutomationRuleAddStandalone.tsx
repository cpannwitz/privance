import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Prisma } from '@prisma/client'

import { useNotification } from '../NotificationSystem/useNotification'
import AutomationRulesEdit from './AutomationRulesEdit/AutomationRulesEdit'
import { AutomationRuleWithCategory } from '../../types/types'

import IconButton from '@mui/material/IconButton'
import AutomationRuleIcon from '@mui/icons-material/MotionPhotosAutoOutlined'

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
  const { notify } = useNotification()

  function onSaveAddEdit(automationRule: AutomationRuleWithCategory) {
    const automationRuleCreateInput: Prisma.AutomationRuleCreateInput = {
      ...automationRule,
      category: { connect: { id: automationRule.category.id } }
    }
    axios
      .post('/api/automationrules/addAutomationRule', automationRuleCreateInput)
      .then(res => {
        const automationRule = res.data.data
        notify(`Added or updated your automation rule!`, 'success')
        if (onAddAutomationRule) onAddAutomationRule(automationRule)
      })
      .catch((error: AxiosError<any>) => {
        if (error.response) {
          notify(`Couldn't add/update your automation rule: ${error.response.data.error}`, 'error')
        }
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
