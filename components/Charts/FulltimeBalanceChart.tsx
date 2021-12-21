import { Datum, ResponsiveLine, PointTooltipProps as TooltipType, Point } from "@nivo/line"
import { useMemo } from "react"
import { TransactionWithCategories } from "../../types/types"
import { Box, useColorModeValue } from "@chakra-ui/react"
import getSymbolFromCurrency from "currency-map-symbol"

function lineChartTransformer(data: TransactionWithCategories[]): Datum[] {
  return data.map(t => ({
    x: new Date(t.issuedate || ""),
    y: t.balance,
    currency: t.balanceCurrency,
  }))
}

interface FulltimeBalanceChartProps {
  data: TransactionWithCategories[]
}

const FulltimeBalanceChart = ({ data }: FulltimeBalanceChartProps) => {
  const transformedData = useMemo(() => lineChartTransformer(data), [data])
  const lineData = useMemo(
    () => [
      {
        id: "FULLTIME_BALANCE",
        data: transformedData,
      },
    ],
    [transformedData]
  )
  return (
    <ResponsiveLine
      data={lineData}
      margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
      xScale={{
        type: "time",
      }}
      axisBottom={{
        format: "%b %Y",
      }}
      yScale={{
        type: "linear",
        nice: true,
      }}
      axisLeft={null}
      // curve="step"
      enablePoints={false}
      lineWidth={1}
      useMesh={true}
      tooltip={PointTooltip}
      enableArea={true}
      enableGridX={true}
      enableGridY={false}
      colors={{ scheme: "category10" }}
      defs={[
        {
          id: "areaGradient",
          type: "linearGradient",
          colors: [
            { offset: 10, color: "#2076b4" },
            { offset: 100, color: "crimson" },
          ],
        },
      ]}
      fill={[{ match: "*", id: "areaGradient" }]}
      // TODO: make colors responsive to darkmode
      theme={{
        textColor: "#dddddd",
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

export default FulltimeBalanceChart

interface PointTooltipProps extends TooltipType {
  point: Point & {
    data: {
      currency?: string | null
    }
  }
}
const PointTooltip = ({ point }: PointTooltipProps) => {
  const bg = useColorModeValue("white", "gray.600")

  return (
    <Box p={1} borderRadius={3} fontSize="sm" bg={bg} d="flex" flexDirection="column" shadow="md">
      <span>{(point.data.x as Date).toLocaleDateString()}</span>
      <span>
        {point.data.y} {getSymbolFromCurrency(point.data.currency)}
      </span>
    </Box>
  )
}
