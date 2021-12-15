import useSWR from "swr"
import { AutomationRuleWithCategories } from "../../types/types"

export default function useGetAutomationRulesActive() {
  const { data, error, isValidating, mutate } = useSWR<{ data: AutomationRuleWithCategories[] }>(
    `/api/automationrules/getAutomationRulesActive`
  )

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  }
}
