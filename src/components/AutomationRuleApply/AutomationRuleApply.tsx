import { useCallback } from 'react'
import {
  useGetAutomationRuleTransactions,
  useGetAutomationRuleById
} from '../ApiSystem/api/automationrules'
import { useGetCategories } from '../ApiSystem/api/categories'
import AutomationRuleApplyPreview from './AutomationRuleApplyPreview'

import DataIsLoading from '../DataStates/DataIsLoading'
import DataIsError from '../DataStates/DataIsError'

interface AutomationRuleApplyProps {
  rule: number
}

const AutomationRuleApply = ({ rule }: AutomationRuleApplyProps) => {
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    refetch: retryCategories
  } = useGetCategories()

  const {
    data: automationRule,
    isError: isErrorAutomationRule,
    isLoading: isLoadingAutomationRule,
    refetch: retryAutomationRule
  } = useGetAutomationRuleById(rule)

  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    refetch: retryTransactions
  } = useGetAutomationRuleTransactions(rule)

  const retry = useCallback(() => {
    retryTransactions()
    retryAutomationRule()
    retryCategories()
  }, [retryTransactions, retryAutomationRule, retryCategories])

  if (isLoadingAutomationRule || isLoadingTransactions || isLoadingCategories) {
    return <DataIsLoading />
  }
  if (
    !automationRule ||
    isErrorAutomationRule ||
    !transactions ||
    isErrorTransactions ||
    !categories ||
    isErrorCategories
  ) {
    return <DataIsError retry={retry} />
  }

  return (
    <AutomationRuleApplyPreview
      transactions={transactions}
      categories={categories}
      automationRule={automationRule}
    />
  )
}

export default AutomationRuleApply
