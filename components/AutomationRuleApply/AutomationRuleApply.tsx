import { useCallback } from "react"
import useGetTransactions from "../hooks/useGetTransactions"
import useGetAutomationRulesById from "../hooks/useGetAutomationRulesById"

import AutomationRuleApplyPreview from "./AutomationRuleApplyPreview"
import DataIsLoading from "../DataStates/DataIsLoading"
import DataIsError from "../DataStates/DataIsError"

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

  const retry = useCallback(() => {
    mutateTransactions()
    mutateAutomationRules()
  }, [mutateTransactions, mutateAutomationRules])

  if (isLoadingAutomationRules || isLoadingTransactions) {
    return <DataIsLoading />
  }
  if (!automationRules || isErrorAutomationRules || !transactions || isErrorTransactions) {
    return <DataIsError retry={retry} />
  }

  return (
    <AutomationRuleApplyPreview transactions={transactions} automationRules={automationRules} />
  )
}

export default AutomationRuleApply
