import type { InferGetStaticPropsType } from "next"

import DatatableContainer from "../components/Datatable/DatatableContainer"

export const getStaticProps = async () => {
  return { props: {} }
}

const OverviewPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <DatatableContainer />
}

export default OverviewPage
