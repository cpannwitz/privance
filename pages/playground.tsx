import type { InferGetStaticPropsType } from "next"
// import { useCallback } from "react"
// import useGetTransactions from "../components/hooks/useGetTransactions"
// import useGetAutomationRules from "../components/hooks/useGetAutomationRules"
// import useGetCategories from "../components/hooks/useGetCategories"
import MainAreaChart from "../components/MainAreaChart/MainAreaChart"
import Autosizer from "react-virtualized-auto-sizer"
import useGetFilteredSortedTransactions from "../components/hooks/useGetFilteredSortedTransactions"
import FulltimeBalanceChart from "../components/Charts/FulltimeBalanceChart"

export const getStaticProps = async () => {
  return { props: {} }
}

const PlaygroundPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    // mutate: mutateTransactions,
  } = useGetFilteredSortedTransactions({ sortDirection: "asc" })

  // const {
  //   data: automationRules,
  //   isError: isErrorAutomationRules,
  //   isLoading: isLoadingAutomationRules,
  //   mutate: mutateAutomationRules,
  // } = useGetAutomationRules()

  // const {
  //   data: categories,
  //   isError: isErrorCategories,
  //   isLoading: isLoadingCategories,
  //   mutate: mutateCategories,
  // } = useGetCategories()

  // const retry = useCallback(() => {
  //   mutateTransactions()
  //   mutateAutomationRules()
  //   mutateCategories()
  // }, [mutateTransactions, mutateAutomationRules, mutateCategories])

  if (
    // isLoadingAutomationRules ||
    isLoadingTransactions
    // || isLoadingCategories
  )
    return <div>loading</div>
  if (
    // !automationRules ||
    // isErrorAutomationRules ||
    !transactions ||
    isErrorTransactions
    // !categories ||
    // isErrorCategories
  )
    return <div>error</div>

  return (
    <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
      {/* <Autosizer> */}
      {/* {({ height, width }) => ( */}
      <FulltimeBalanceChart
        // width={width} height={height}
        data={transactions}
      />
      {/* )} */}
      {/* </Autosizer> */}
    </div>
  )
  return <div>Playground</div>
}

export default PlaygroundPage
