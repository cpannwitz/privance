import { AllTimeAggregations } from "../../types/types"
import {
  Heading,
  Box,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"

import getSymbolFromCurrency from "currency-map-symbol"
import BalanceChart from "../Charts/BalanceChart"
import CategoriesCharts from "../Charts/CategoriesChart"

interface AllTimeInsightContentProps {
  allTimeAggregations: AllTimeAggregations
}

const AllTimeInsightContent = ({ allTimeAggregations }: AllTimeInsightContentProps) => {
  return (
    <Box>
      <Heading as="h1" mb={5}>
        Overall
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total Gain/Loss</StatLabel>
          <StatNumber
            color={
              Math.abs(allTimeAggregations.totalMinus) > Math.abs(allTimeAggregations.totalPlus)
                ? "red.500"
                : "green.500"
            }
          >
            {Number(allTimeAggregations.totalMinus + allTimeAggregations.totalPlus).toFixed(2)} {}
            {getSymbolFromCurrency(allTimeAggregations.currency)}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={
                Math.abs(allTimeAggregations.totalMinus) > Math.abs(allTimeAggregations.totalPlus)
                  ? "decrease"
                  : "increase"
              }
            />
            {new Date(allTimeAggregations.startDate).toLocaleDateString()} -{" "}
            {new Date(allTimeAggregations.endDate).toLocaleDateString()}
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Current Balance</StatLabel>
          <StatNumber>
            {Number(
              allTimeAggregations.totalMinus +
                allTimeAggregations.totalPlus +
                allTimeAggregations.preBalance
            ).toFixed(2)}{" "}
            {}
            {getSymbolFromCurrency(allTimeAggregations.currency)}
          </StatNumber>
          <StatHelpText>
            {Number(allTimeAggregations.preBalance).toFixed(2)}
            {getSymbolFromCurrency(allTimeAggregations.currency)} pre-existent
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Spend</StatLabel>
          <StatNumber color="red.500">
            {Number(allTimeAggregations.totalMinus).toFixed(2)}
            {getSymbolFromCurrency(allTimeAggregations.currency)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            {Number(allTimeAggregations.totalMinusPercentage).toFixed(2)}%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Income</StatLabel>
          <StatNumber color="green.500">
            {Number(allTimeAggregations.totalPlus).toFixed(2)}
            {getSymbolFromCurrency(allTimeAggregations.currency)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {Number(allTimeAggregations.totalPlusPercentage).toFixed(2)}%
          </StatHelpText>
        </Stat>

        {/* <Stat>
         // TODO: add ETF API, save option fragments to DB
          <StatLabel>ETF</StatLabel>
          <StatNumber color="green.500">
            123
            {getSymbolFromCurrency(allTimeAggregations.currency)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            123
          </StatHelpText>
        </Stat> */}
      </StatGroup>
      <Box w="100%" h="200px">
        <BalanceChart data={allTimeAggregations.transactions} />
      </Box>
      <Box w="100%" h="300px">
        <CategoriesCharts categories={allTimeAggregations.categories} />
      </Box>
    </Box>
  )
}

export default AllTimeInsightContent
