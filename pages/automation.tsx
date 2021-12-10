import type { InferGetStaticPropsType } from "next"

import Automation from "../components/Automation/Automation"

export const getStaticProps = async () => {
  return { props: {} }
}

const AutomationPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Automation />
}

export default AutomationPage
