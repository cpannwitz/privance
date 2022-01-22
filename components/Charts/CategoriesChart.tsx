import { useMemo } from "react"
import { ResponsiveBar } from "@nivo/bar"
import { CategoryWithTransactions } from "../../types/types"

function barChartTransformer(
  data: (CategoryWithTransactions & {
    transactionBalance: number
  })[]
) {
  return data
    .map(category => ({
      name: category.name,
      transactionBalance: category.transactionBalance,
      count: category._count.transactions,
      color: category.color || "#336699",
    }))
    .sort((a, b) => b.transactionBalance - a.transactionBalance)
    .slice(0, 8)
  // TODO maybe do this dynamic?
}

type BarCategory = {
  name: string
  transactionBalance: number
  count: number
  color: string
}

interface CategoriesChartsProps {
  categories: (CategoryWithTransactions & {
    transactionBalance: number
  })[]
}

const CategoriesCharts = ({ categories }: CategoriesChartsProps) => {
  const transformedData = useMemo(() => barChartTransformer(categories), [categories])

  return (
    <ResponsiveBar<BarCategory>
      data={transformedData}
      keys={["transactionBalance"]}
      indexBy={d => d.name}
      margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={d => d.data.color}
      axisTop={null}
      axisRight={null}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="white"
      label={({ value }) => value?.toFixed(2) + " €"}
      tooltip={({ indexValue, value, data }) => (
        <div
          style={{
            padding: 12,
            color: "white",
            background: "#222222",
          }}
        >
          <strong>
            {indexValue}: {value.toFixed(2)} €
          </strong>
          <br />
          <span>{data.count} transactions</span>
        </div>
      )}
      theme={{
        textColor: "#888888",
        grid: {
          line: {
            stroke: "#ccc",
            strokeWidth: 0.5,
          },
        },
        tooltip: {
          container: {
            color: "#ffffff",
            background: "#383838",
          },
        },
      }}
    />
  )
}

export default CategoriesCharts
