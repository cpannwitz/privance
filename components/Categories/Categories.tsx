import React, { useCallback } from "react"
import useGetCategories from "../hooks/useGetCategories"
import CategoryList from "./CategoryList"
import { DataIsLoading, DataIsEmpty, DataIsError } from "./CategoriesStates"

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
  if (isErrorCategories) return <DataIsError retry={retryCategories} />
  if (!categories || categories.length === 0) return <DataIsEmpty />

  return <CategoryList data={categories} />
}

export default Categories
