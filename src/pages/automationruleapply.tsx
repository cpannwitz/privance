import type { InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"

import AutomationRuleApply from "../components/AutomationRuleApply/AutomationRuleApply"

export const getStaticProps = async () => {
  return { props: {} }
}

const AutomationRuleApplyPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { rules } = router.query

  const automationRuleIds: number[] = []
  if (rules && typeof rules === "string") {
    automationRuleIds.push(Number(rules))
  } else if (rules && Array.isArray(rules)) {
    automationRuleIds.push(...rules.map(rule => Number(rule)))
  }

  return <AutomationRuleApply rules={automationRuleIds} />
}

export default AutomationRuleApplyPage
