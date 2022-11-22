import React, { useCallback } from 'react'
import { useGetAutomationRulesByCategory } from '../ApiSystem/api/automationrules'
import DataIsLoading from '../DataStates/DataIsLoading'
import DataIsError from '../DataStates/DataIsError'
import AutomationRulesList from './AutomationRulesList'

interface AutomationProps {}

const Automation = ({}: AutomationProps) => {
  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    refetch: retryAutomationRules
  } = useGetAutomationRulesByCategory()

  const retry = useCallback(() => {
    retryAutomationRules()
  }, [retryAutomationRules])

  if (isLoadingAutomationRules) {
    return <DataIsLoading />
  }
  if (!automationRules || isErrorAutomationRules) {
    return <DataIsError retry={retry} />
  }

  return <AutomationRulesList data={automationRules} />
}

export default Automation
