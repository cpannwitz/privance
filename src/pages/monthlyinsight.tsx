import type { InferGetStaticPropsType } from 'next'

import MonthlyInsight from '../components/MonthlyInsight/MonthlyInsight'

export const getStaticProps = async () => {
  return { props: {} }
}

const MonthlyInsightPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <MonthlyInsight />
}

export default MonthlyInsightPage
