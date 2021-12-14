import React, { useCallback } from "react"
import useGetAutomationRules from "../hooks/useGetAutomationRules"
import AutomationRulesList from "./AutomationRulesList"
import { DataIsLoading, DataIsError } from "./AutomationRulesListStates"

interface AutomationProps {}

const Automation = ({}: AutomationProps) => {
  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    mutate: mutateAutomationRules,
  } = useGetAutomationRules()
  const retryAutomationRules = useCallback(() => mutateAutomationRules(), [mutateAutomationRules])

  if (isLoadingAutomationRules) return <DataIsLoading />
  if (!automationRules || isErrorAutomationRules)
    return <DataIsError retry={retryAutomationRules} />

  return <AutomationRulesList data={automationRules} />
}

export default Automation
