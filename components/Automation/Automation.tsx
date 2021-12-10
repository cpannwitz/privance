import React, { useCallback } from "react"
import useGetAutomationRules from "../hooks/useGetAutomationRules"
import AutomationList from "./AutomationList"
import { DataIsLoading, DataIsEmpty, DataIsError } from "./AutomationListStates"

interface AutomationProps {}

const Automation = ({}: AutomationProps) => {
  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    mutate: mutateCategories,
  } = useGetAutomationRules()
  const retryAutomationRules = useCallback(() => mutateCategories(), [mutateCategories])

  if (isLoadingAutomationRules) return <DataIsLoading />
  if (isErrorAutomationRules) return <DataIsError retry={retryAutomationRules} />
  if (!automationRules || automationRules.length === 0) return <DataIsEmpty />

  return <AutomationList data={automationRules} />
}

export default Automation
