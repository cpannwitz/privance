import React, { useCallback } from "react"
import useGetAutomationRulesByCategory from "../hooks/useGetAutomationRulesByCategory"
import DataIsLoading from "../DataStates/DataIsLoading"
import DataIsError from "../DataStates/DataIsError"
import AutomationRulesList from "./AutomationRulesList"

interface AutomationProps {}

const Automation = ({}: AutomationProps) => {
  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    mutate: mutateAutomationRules,
  } = useGetAutomationRulesByCategory()

  const retryAutomationRules = useCallback(() => {
    mutateAutomationRules()
  }, [mutateAutomationRules])

  if (isLoadingAutomationRules) {
    return <DataIsLoading />
  }
  if (!automationRules || isErrorAutomationRules) {
    return <DataIsError retry={retryAutomationRules} />
  }

  return <AutomationRulesList data={automationRules} />
}

export default Automation
