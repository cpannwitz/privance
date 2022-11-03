import type { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import AutomationRuleApply from '../components/AutomationRuleApply/AutomationRuleApply'
import AutomationRules from '../components/AutomationRules/AutomationRules'

export const getStaticProps = async () => {
  return { props: {} }
}

const AutomationRuleApplyPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { rule } = router.query

  const automationRuleId: number | null = Number(rule) || null

  if (!automationRuleId) {
    return <AutomationRules />
  }

  return <AutomationRuleApply rule={automationRuleId} />
}

export default AutomationRuleApplyPage
