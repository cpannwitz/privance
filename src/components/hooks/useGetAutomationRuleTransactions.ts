import type { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';
import type { TransactionWithCategory } from '../../types/types';

export default function useGetAutomationRuleTransactions(rule: number) {
  const requestConfig: AxiosRequestConfig = useMemo(() => ({ params: { rule } }), [rule]);

  const { data, error, isValidating, mutate } = useSWR<{ data: TransactionWithCategory[] }>([
    `/api/automationrules/getAutomationRuleTransactions`,
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
