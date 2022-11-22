import { Prisma, AutomationRule } from '@prisma/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  AutomationRuleWithCategory,
  CategoryWithAutomationRules,
  TransactionWithCategory
} from '../../../types/types'
import { ApiBase, API_MAP } from '../ApiBase'
import { queryClient } from '../ApiCacheProvider'

const api = API_MAP.automationRules

// * GET

export function getAutomationRules() {
  return ApiBase.get<AutomationRuleWithCategory[]>(api.getAutomationRules.url).then(res => res.data)
}
// TODO: unused
export function useGetAutomationRules() {
  const query = useQuery({
    queryKey: api.getAutomationRules.keys(),
    queryFn: getAutomationRules
  })
  return query
}

export function getAutomationRuleById(id: number) {
  return ApiBase.get<AutomationRuleWithCategory>(api.getAutomationRuleById.url, {
    params: { id }
  }).then(res => res.data)
}

export function useGetAutomationRuleById(id: number) {
  const query = useQuery({
    queryKey: api.getAutomationRuleById.keys(id),
    queryFn: () => getAutomationRuleById(id)
  })
  return query
}

export function getAutomationRulesActive() {
  return ApiBase.get<AutomationRuleWithCategory[]>(api.getAutomationRulesActive.url).then(
    res => res.data
  )
}

export function useGetAutomationRulesActive() {
  const query = useQuery({
    queryKey: api.getAutomationRulesActive.keys(),
    queryFn: getAutomationRulesActive
  })
  return query
}

export function getAutomationRulesByCategory() {
  return ApiBase.get<CategoryWithAutomationRules[]>(api.getAutomationRulesByCategory.url).then(
    res => res.data
  )
}

export function useGetAutomationRulesByCategory() {
  const query = useQuery({
    queryKey: api.getAutomationRulesByCategory.keys(),
    queryFn: getAutomationRulesByCategory
  })
  return query
}

export function getAutomationRuleTransactions(id: number) {
  return ApiBase.get<TransactionWithCategory[]>(api.getAutomationRuleTransactions.url, {
    params: { id }
  }).then(res => res.data)
}

export function useGetAutomationRuleTransactions(id: number) {
  const query = useQuery({
    queryKey: api.getAutomationRuleTransactions.keys(id),
    queryFn: () => getAutomationRuleTransactions(id)
  })
  return query
}

// * ADD

export function upsertAutomationRule(automationRule: Prisma.AutomationRuleUncheckedCreateInput) {
  return ApiBase.post<AutomationRuleWithCategory>(
    api.upsertAutomationRule.url,
    automationRule
  ).then(res => res.data)
}

export function useUpsertAutomationRule() {
  const mutation = useMutation({
    mutationFn: upsertAutomationRule,
    onSuccess: () =>
      api.upsertAutomationRule.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}

// * DELETE

export function deleteAutomationRule(automationRuleId: number) {
  return ApiBase.delete<AutomationRule>(api.deleteAutomationRule.url, {
    data: { id: automationRuleId }
  }).then(res => res.data)
}

export function useDeleteAutomationRule() {
  const mutation = useMutation({
    mutationFn: deleteAutomationRule,
    onSuccess: () =>
      api.deleteAutomationRule.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}
