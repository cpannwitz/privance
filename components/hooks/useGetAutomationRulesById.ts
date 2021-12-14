import { AxiosRequestConfig } from "axios"
import { useMemo } from "react"
import useSWR from "swr"
import { AutomationRuleWithCategories } from "../../types/types"

export default function useGetAutomationRulesById(rules: number[]) {
  const requestConfig: AxiosRequestConfig = useMemo(() => ({ params: { rules } }), [rules])
  const { data, error, isValidating, mutate } = useSWR<{ data: AutomationRuleWithCategories[] }>([
    `/api/automationrules/getAutomationRulesById`,
    requestConfig,
  ])

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}
