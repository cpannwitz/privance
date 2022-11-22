import { Prisma, Category } from '@prisma/client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { CategoriesStatistics, CategoryWithTransactions } from '../../../types/types'
import { ApiBase, API_MAP } from '../ApiBase'
import { queryClient } from '../ApiCacheProvider'

const api = API_MAP.categories

// * GET

export function getCategories() {
  return ApiBase.get<Category[]>(api.getCategories.url).then(res => res.data)
}

export function useGetCategories() {
  const query = useQuery({
    queryKey: api.getCategories.keys(),
    queryFn: getCategories
  })
  return query
}

export function getCategoriesStatistics() {
  return ApiBase.get<CategoriesStatistics>(api.getCategoriesStatistics.url).then(res => res.data)
}
export function useGetCategoriesStatistics() {
  const query = useQuery({
    queryKey: api.getCategoriesStatistics.keys(),
    queryFn: getCategoriesStatistics
  })
  return query
}

export function getCategoryTransactions(id: number) {
  return ApiBase.get<CategoryWithTransactions>(api.getCategoryTransactions.url, {
    params: { id }
  }).then(res => res.data)
}
// TODO: unused
export function useGetCategoryTransactions(id: number) {
  const query = useQuery({
    queryKey: api.getCategoryTransactions.keys(id),
    queryFn: () => getCategoryTransactions(id)
  })
  return query
}

export function getCategoriesTransactions() {
  return ApiBase.get<CategoryWithTransactions[]>(api.getCategoriesTransactions.url).then(
    res => res.data
  )
}
export function useGetCategoriesTransactions() {
  const query = useQuery({
    queryKey: api.getCategoriesTransactions.keys(),
    queryFn: getCategoriesTransactions
  })
  return query
}

// * ADD/EDIT

export function upsertCategory(category: Prisma.CategoryUncheckedCreateInput) {
  return ApiBase.post<Category>(api.upsertCategory.url, category).then(res => res.data)
}

export function useUpsertCategory() {
  const mutation = useMutation({
    mutationFn: upsertCategory,
    onSuccess: () =>
      api.upsertCategory.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}

// * DELETE

export function deleteCategory(id: number) {
  return ApiBase.delete<Category>(api.deleteCategory.url, { data: { id } }).then(res => res.data)
}

export function useDeleteCategory() {
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () =>
      api.deleteCategory.invalidates().forEach(key => {
        queryClient.invalidateQueries([key])
      })
  })
  return mutation
}
