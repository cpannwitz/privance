import { useCallback } from "react"
import useGetTransactions from "../hooks/useGetTransactions"
import useGetAutomationRulesById from "../hooks/useGetAutomationRulesById"

import AutomationRuleApplyPreview from "./AutomationRuleApplyPreview"
import { DataIsError, DataIsLoading } from "./AutomationRuleApplyStates"
import useGetCategories from "../hooks/useGetCategories"

interface AutomationRuleApplyProps {
  rules: number[]
}

const AutomationRuleApply = ({ rules }: AutomationRuleApplyProps) => {
  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions,
  } = useGetTransactions()

  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    mutate: mutateAutomationRules,
  } = useGetAutomationRulesById(rules)

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategories()

  const retry = useCallback(() => {
    mutateTransactions()
    mutateAutomationRules()
    mutateCategories()
  }, [mutateTransactions, mutateAutomationRules, mutateCategories])

  if (isLoadingAutomationRules || isLoadingTransactions || isLoadingCategories)
    return <DataIsLoading />
  if (
    !automationRules ||
    isErrorAutomationRules ||
    !transactions ||
    isErrorTransactions ||
    !categories ||
    isErrorCategories
  )
    return <DataIsError retry={retry} />

  return (
    <AutomationRuleApplyPreview
      transactions={transactions}
      automationRules={automationRules}
      categories={categories}
    />
  )
}

export default AutomationRuleApply
