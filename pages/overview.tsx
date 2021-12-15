import type { InferGetStaticPropsType } from "next"

import TransactionTableContainer from "../components/TransactionTable/TransactionTableContainer"

export const getStaticProps = async () => {
  return { props: {} }
}

const OverviewPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <TransactionTableContainer />
}

export default OverviewPage
