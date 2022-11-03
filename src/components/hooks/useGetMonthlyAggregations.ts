import useSWR from 'swr';
import { MonthlyAggregations } from '../../types/types';

export default function useGetMonthlyAggregations() {
  const { data, error, isValidating, mutate } = useSWR<{ data: MonthlyAggregations }>(
    `/api/aggregations/getMonthlyAggregations`
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate
  };
}
