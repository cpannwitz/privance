import type { InferGetStaticPropsType } from "next"

import Categories from "../components/Categories/Categories"

export const getStaticProps = async () => {
  return { props: {} }
}

const OverviewPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Categories />
}

export default OverviewPage
