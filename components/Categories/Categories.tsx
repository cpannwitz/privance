import React from "react"
import useGetCategories from "../hooks/useGetCategories"
import CategoryList from "./CategoryList"

interface CategoriesProps {}

// TODO: add loading, error states

const Categories = ({}: CategoriesProps) => {
  const { data, isError, isLoading, mutate } = useGetCategories()
  return <CategoryList data={data || []} />
}

export default Categories
