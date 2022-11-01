import { useCallback } from "react"
import useGetTransactions from "../hooks/useGetTransactions"
import useGetAutomationRulesById from "../hooks/useGetAutomationRulesById"

import AutomationRuleApplyPreview from "./AutomationRuleApplyPreview"
import DataIsLoading from "../DataStates/DataIsLoading"
import DataIsError from "../DataStates/DataIsError"
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
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategories()

  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    mutate: mutateAutomationRules,
  } = useGetAutomationRulesById(rules)

  const retry = useCallback(() => {
    mutateTransactions()
    mutateAutomationRules()
    mutateCategories()
  }, [mutateTransactions, mutateAutomationRules, mutateCategories])

  if (isLoadingAutomationRules || isLoadingTransactions || isLoadingCategories) {
    return <DataIsLoading />
  }
  if (
    !automationRules ||
    isErrorAutomationRules ||
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
      automationRules={automationRules}
    />
  )
}

export default AutomationRuleApply
