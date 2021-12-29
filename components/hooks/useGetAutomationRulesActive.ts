import useSWR from "swr"
import { AutomationRuleWithCategory } from "../../types/types"

export default function useGetAutomationRulesActive() {
  const { data, error, isValidating, mutate } = useSWR<{ data: AutomationRuleWithCategory[] }>(
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
