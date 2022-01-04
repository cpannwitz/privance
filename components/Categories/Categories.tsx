import React, { useCallback } from "react"
import useGetCategoriesTransactions from "../hooks/useGetCategoriesTransactions"
import useGetCategoriesStatistics from "../hooks/useGetCategoriesStatistics"
import CategoryList from "./CategoryList"
import { DataIsLoading, DataIsError } from "./CategoriesStates"

interface CategoriesProps {}

const Categories = ({}: CategoriesProps) => {
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategoriesTransactions()

  const {
    data: categoriesStatistics,
    isError: isErrorCategoriesStatistics,
    isLoading: isLoadingCategoriesStatistics,
    mutate: mutateCategoriesStatistics,
  } = useGetCategoriesStatistics()

  const retry = useCallback(() => {
    mutateCategories()
    mutateCategoriesStatistics()
  }, [mutateCategories, mutateCategoriesStatistics])

  if (isLoadingCategories || isLoadingCategoriesStatistics) return <DataIsLoading />
  if (!categories || isErrorCategories || !categoriesStatistics || isErrorCategoriesStatistics)
    return <DataIsError retry={retry} />

  return <CategoryList categories={categories} categoriesStatistics={categoriesStatistics} />
}

export default Categories
