import useSWR from 'swr';
import type { CategoryWithAutomationRules } from '../../types/types';

export default function useGetAutomationRulesByCategory() {
  const { data, error, isValidating, mutate } = useSWR<{
    data: CategoryWithAutomationRules[];
  }>(`/api/automationrules/getAutomationRulesByCategory`);

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  };
}
