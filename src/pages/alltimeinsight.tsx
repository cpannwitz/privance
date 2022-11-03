import type { InferGetStaticPropsType } from 'next'

import AllTimeInsight from '../components/AllTimeInsight/AllTimeInsight'

export const getStaticProps = async () => {
  return { props: {} }
}

const AllTimeInsightPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <AllTimeInsight />
}

export default AllTimeInsightPage
