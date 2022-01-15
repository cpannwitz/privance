import { useCallback } from "react"

import Upload from "./Upload"
import DataIsError from "../DataStates/DataIsError"
import DataIsLoading from "../DataStates/DataIsLoading"
import useGetAutomationRulesActive from "../hooks/useGetAutomationRulesActive"

interface UploadContainerProps {}

const UploadContainer = ({}: UploadContainerProps) => {
  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    mutate: mutateAutomationRules,
  } = useGetAutomationRulesActive()

  const retry = useCallback(() => {
    mutateAutomationRules()
  }, [mutateAutomationRules])

  if (isLoadingAutomationRules) {
    return <DataIsLoading />
  }
  if (!automationRules || isErrorAutomationRules) {
    return <DataIsError retry={retry} />
  }

  return <Upload automationRules={automationRules} />
}

export default UploadContainer
