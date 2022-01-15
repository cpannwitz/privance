import { useState } from "react"
import { MonthlyAggregations } from "../../types/types"
import {
  Icon,
  Heading,
  Box,
  Stack,
  Button,
  SimpleGrid,
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
import TransactionTable from "../TransactionTable/TransactionTable"

import TableIcon from "remixicon-react/TableLineIcon"

interface MonthlyInsightGridProps {
  monthlyAggregations: MonthlyAggregations
}

const MonthlyInsightGrid = ({ monthlyAggregations }: MonthlyInsightGridProps) => {
  return (
    <Stack direction="column" p={5}>
      {Object.keys(monthlyAggregations.years)
        .reverse()
        .map(year => {
          return (
            <Box key={year}>
              <Heading size="2xl" mb={5}>
                {year}
              </Heading>
              <SimpleGrid columns={2} spacing={10}>
                {Object.keys(monthlyAggregations.years[year].months)
                  .reverse()
                  .map(month => {
                    const monthStats = monthlyAggregations.years[year].months[month]
                    return (
                      <MonthGridItem
                        key={month + year}
                        currency={monthlyAggregations.currency}
                        {...monthStats}
                      />
                    )
                  })}
              </SimpleGrid>
            </Box>
          )
        })}
    </Stack>
  )
}

export default MonthlyInsightGrid

type MonthGridItemProps = MonthlyAggregations["years"][string]["months"][string] & {
  currency: string
}
const MonthGridItem = ({
  currency,
  month,
  totalMonthMinus,
  totalMonthPlus,
  totalMonthMinusPercentage,
  totalMonthPlusPercentage,
  transactions,
  categories,
}: MonthGridItemProps) => {
  const [showTable, setShowTable] = useState(false)
  return (
    <Box>
      <Heading size="lg" mb={5}>
        {getMonthName(month)}
      </Heading>
      <StatGroup>
        <Stat>
          <StatLabel>Total Gain/Loss</StatLabel>
          <StatNumber
            color={Math.abs(totalMonthMinus) > Math.abs(totalMonthPlus) ? "red.500" : "green.500"}
          >
            {Number(totalMonthMinus + totalMonthPlus).toFixed(2)} {getSymbolFromCurrency(currency)}
          </StatNumber>
          <StatHelpText>
            <StatArrow
              type={Math.abs(totalMonthMinus) > Math.abs(totalMonthPlus) ? "decrease" : "increase"}
            />
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Spend</StatLabel>
          <StatNumber color="red.500">
            {Number(totalMonthMinus).toFixed(2)}
            {getSymbolFromCurrency(currency)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            {Number(totalMonthMinusPercentage).toFixed(2)}%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Income</StatLabel>
          <StatNumber color="green.500">
            {Number(totalMonthPlus).toFixed(2)}
            {getSymbolFromCurrency(currency)}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            {Number(totalMonthPlusPercentage).toFixed(2)}%
          </StatHelpText>
        </Stat>
      </StatGroup>
      {transactions.length > 0 && (
        <Box w="100%" h="200px">
          <BalanceChart data={transactions} variant="small" />
        </Box>
      )}
      {categories.length > 0 && (
        <Box w="100%" h="200px">
          <CategoriesCharts categories={categories} />
        </Box>
      )}

      <Button
        size="sm"
        isFullWidth
        variant="ghost"
        colorScheme="gray"
        color="gray.500"
        leftIcon={<Icon as={TableIcon} />}
        onClick={() => setShowTable(v => !v)}
      >
        Show Transactions
      </Button>
      {showTable && (
        <Box w="100%" h="400px" mt={3}>
          <TransactionTable transactions={transactions} />
        </Box>
      )}
    </Box>
  )
}

function getMonthName(month: number, locale = "en") {
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date().setMonth(month))
}
