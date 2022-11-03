import { useCallback } from 'react'
import useGetAutomationRuleById from '../hooks/useGetAutomationRuleById'
import useGetAutomationRuleTransactions from '../hooks/useGetAutomationRuleTransactions'
import AutomationRuleApplyPreview from './AutomationRuleApplyPreview'

import DataIsLoading from '../DataStates/DataIsLoading'
import DataIsError from '../DataStates/DataIsError'
import useGetCategories from '../hooks/useGetCategories'

interface AutomationRuleApplyProps {
  rule: number
}

const AutomationRuleApply = ({ rule }: AutomationRuleApplyProps) => {
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories
  } = useGetCategories()

  const {
    data: automationRule,
    isError: isErrorAutomationRule,
    isLoading: isLoadingAutomationRule,
    mutate: mutateAutomationRule
  } = useGetAutomationRuleById(rule)

  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions
  } = useGetAutomationRuleTransactions(rule)

  const retry = useCallback(() => {
    mutateTransactions()
    mutateAutomationRule()
    mutateCategories()
  }, [mutateTransactions, mutateAutomationRule, mutateCategories])

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
