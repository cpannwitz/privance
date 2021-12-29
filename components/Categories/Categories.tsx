import React, { useCallback } from "react"
import useGetCategories from "../hooks/useGetCategories"
import CategoryList from "./CategoryList"
import { DataIsLoading, DataIsError } from "./CategoriesStates"

interface CategoriesProps {}

const Categories = ({}: CategoriesProps) => {
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategories()
  const retryCategories = useCallback(() => mutateCategories(), [mutateCategories])

  if (isLoadingCategories) return <DataIsLoading />
  if (!categories || isErrorCategories) return <DataIsError retry={retryCategories} />

  return <CategoryList data={categories} />
}

export default Categories
