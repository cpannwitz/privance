import { InferGetStaticPropsType } from 'next'

import Categories from '../components/Categories/Categories'

export const getStaticProps = async () => {
  return { props: {} }
}

const CategoriesPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Categories />
}

export default CategoriesPage
