import { useCallback } from "react"

import Upload from "./Upload"
import DataIsError from "../DataStates/DataIsError"
import DataIsLoading from "../DataStates/DataIsLoading"
import useGetAutomationRulesActive from "../hooks/useGetAutomationRulesActive"
import useGetCategories from "../hooks/useGetCategories"

interface UploadContainerProps {}

const UploadContainer = ({}: UploadContainerProps) => {
  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    mutate: mutateAutomationRules,
  } = useGetAutomationRulesActive()

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategories()

  const retry = useCallback(() => {
    mutateAutomationRules()
    mutateCategories()
  }, [mutateAutomationRules, mutateCategories])

  if (isLoadingAutomationRules || isLoadingCategories) {
    return <DataIsLoading />
  }
  if (!automationRules || isErrorAutomationRules || !categories || isErrorCategories) {
    return <DataIsError retry={retry} />
  }

  return <Upload automationRules={automationRules} categories={categories} />
}

export default UploadContainer
