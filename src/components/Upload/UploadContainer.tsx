import { useCallback } from 'react'

import Upload from './Upload'
import DataIsError from '../DataStates/DataIsError'
import DataIsLoading from '../DataStates/DataIsLoading'
import { useGetAutomationRulesActive } from '../ApiSystem/api/automationrules'
import { useGetCategories } from '../ApiSystem/api/categories'

interface UploadContainerProps {}

const UploadContainer = ({}: UploadContainerProps) => {
  const {
    data: automationRules,
    isError: isErrorAutomationRules,
    isLoading: isLoadingAutomationRules,
    refetch: retryAutomationRules
  } = useGetAutomationRulesActive()

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    refetch: retryCategories
  } = useGetCategories()

  const retry = useCallback(() => {
    retryAutomationRules()
    retryCategories()
  }, [retryAutomationRules, retryCategories])

  if (isLoadingAutomationRules || isLoadingCategories) {
    return <DataIsLoading />
  }
  if (!automationRules || isErrorAutomationRules || !categories || isErrorCategories) {
    return <DataIsError retry={retry} />
  }

  return <Upload automationRules={automationRules} categories={categories} />
}

export default UploadContainer
