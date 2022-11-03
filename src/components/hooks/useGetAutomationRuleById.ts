import type { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';
import type { AutomationRuleWithCategory } from '../../types/types';

export default function useGetAutomationRuleById(rule: number) {
  const requestConfig: AxiosRequestConfig = useMemo(() => ({ params: { rule } }), [rule]);

  const { data, error, isValidating, mutate } = useSWR<{ data: AutomationRuleWithCategory }>([
    `/api/automationrules/getAutomationRuleById`,
    requestConfig
  ]);

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  };
}
