import { Datum, ResponsiveLine, PointTooltipProps as TooltipType, Point } from "@nivo/line"
import { useMemo } from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"
import getSymbolFromCurrency from "currency-map-symbol"
import { Transaction } from ".prisma/client"

function lineChartTransformer(data: Transaction[]): Datum[] {
  return data.map(t => ({
    x: new Date(t.issuedate || ""),
    y: t.balance,
    currency: t.balanceCurrency,
  }))
}

function getMinMaxBalance(data: Transaction[]): { min: number; max: number } {
  if (data.length <= 0) {
    return { min: 0, max: 0 }
  }
  return data.reduce(
    (sum, t) => ({
      min: Math.min(sum.min, t.balance || 0),
      max: Math.max(sum.max, t.balance || 0),
    }),
    { min: data[0].balance || 0, max: data[0].balance || 0 }
  )
}

interface BalanceChartProps {
  data: Transaction[]
  variant?: "default" | "small"
}

const BalanceChart = ({ data, variant = "default" }: BalanceChartProps) => {
  const isVariantDefault = variant === "default"
  const transformedData = useMemo(() => lineChartTransformer(data), [data])
  const minMaxBalance = useMemo(() => getMinMaxBalance(data), [data])
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
      margin={
        isVariantDefault
          ? { top: 20, right: 20, bottom: 30, left: 20 }
          : { top: 10, right: 10, bottom: 10, left: 10 }
      }
      xScale={{
        type: "time",
      }}
      axisBottom={
        isVariantDefault
          ? {
              format: "%b %Y",
            }
          : null
      }
      yScale={{
        type: "linear",
        nice: true,
      }}
      axisLeft={null}
      markers={[
        {
          axis: "y",
          value: minMaxBalance.min,
          lineStyle: { stroke: "rgba(255, 0, 0, .4)", strokeWidth: 1, strokeDasharray: 4 },
          legend: `min. ${minMaxBalance.min}`,
          textStyle: {
            fill: "#818181",
            fontSize: "11px",
          },
        },
        {
          axis: "y",
          value: minMaxBalance.max,
          lineStyle: { stroke: "rgba(0, 255, 0, .4)", strokeWidth: 1, strokeDasharray: 4 },
          legend: `max. ${minMaxBalance.max}`,
          textStyle: {
            fill: "#818181",
            fontSize: "11px",
          },
        },
      ]}
      curve="stepAfter"
      enablePoints={false}
      lineWidth={1}
      useMesh={true}
      tooltip={PointTooltip}
      enableArea={true}
      enableGridX={isVariantDefault ? true : false}
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

export default BalanceChart

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
