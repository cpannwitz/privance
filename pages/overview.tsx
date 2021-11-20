import type { InferGetStaticPropsType } from "next"

import Datatable from "../components/Datatable/Datatable"

export const getStaticProps = async () => {
  return { props: {} }
}

const OverviewPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Datatable />
}

export default OverviewPage
