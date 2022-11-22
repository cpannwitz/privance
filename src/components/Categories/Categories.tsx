import React, { useCallback } from 'react'
import {
  useGetCategoriesStatistics,
  useGetCategoriesTransactions
} from '../ApiSystem/api/categories'
import CategoryList from './CategoryList'
import DataIsLoading from '../DataStates/DataIsLoading'
import DataIsError from '../DataStates/DataIsError'

interface CategoriesProps {}

const Categories = ({}: CategoriesProps) => {
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    refetch: retryCategories
  } = useGetCategoriesTransactions()

  const {
    data: categoriesStatistics,
    isError: isErrorCategoriesStatistics,
    isLoading: isLoadingCategoriesStatistics,
    refetch: retryCategoriesStatistics
  } = useGetCategoriesStatistics()

  const retry = useCallback(() => {
    retryCategories()
    retryCategoriesStatistics()
  }, [retryCategories, retryCategoriesStatistics])

  if (isLoadingCategories || isLoadingCategoriesStatistics) {
    return <DataIsLoading />
  }
  if (!categories || isErrorCategories || !categoriesStatistics || isErrorCategoriesStatistics) {
    return <DataIsError retry={retry} />
  }

  return <CategoryList categories={categories} categoriesStatistics={categoriesStatistics} />
}

export default Categories
