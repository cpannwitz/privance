import type { InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"

// import AutomationRules from "../components/AutomationRules/AutomationRules"

export const getStaticProps = async () => {
  return { props: {} }
}

const AutomationRuleApplyPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const query = router.query

  return <div>Hello apply</div>
}

export default AutomationRuleApplyPage
