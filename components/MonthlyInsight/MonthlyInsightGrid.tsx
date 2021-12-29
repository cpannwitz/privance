import { useState } from "react"
import { MonthlyTransactions, TransactionWithCategory } from "../../types/types"
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
import TransactionTable from "../TransactionTable/TransactionTable"

import TableIcon from "remixicon-react/TableLineIcon"

interface MonthlyInsightGridProps {
  transactions: TransactionWithCategory[]
  monthlyTransactions: MonthlyTransactions
}

const MonthlyInsightGrid = ({ transactions, monthlyTransactions }: MonthlyInsightGridProps) => {
  return (
    <Stack direction="column" p={5}>
      <Box>
        <Heading as="h1" mb={5}>
          Overall
        </Heading>
        <StatGroup>
          <Stat>
            <StatLabel>Total Gain/Loss</StatLabel>
            <StatNumber
              color={
                Math.abs(monthlyTransactions.totalMinus) > Math.abs(monthlyTransactions.totalPlus)
                  ? "red.500"
                  : "green.500"
              }
            >
              {Number(monthlyTransactions.totalMinus + monthlyTransactions.totalPlus).toFixed(2)} {}
              {getSymbolFromCurrency(monthlyTransactions.currency)}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={
                  Math.abs(monthlyTransactions.totalMinus) > Math.abs(monthlyTransactions.totalPlus)
                    ? "decrease"
                    : "increase"
                }
              />
              {new Date(monthlyTransactions.startDate).toLocaleDateString()} -{" "}
              {new Date(monthlyTransactions.endDate).toLocaleDateString()}
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Current Balance</StatLabel>
            <StatNumber>
              {Number(
                monthlyTransactions.totalMinus +
                  monthlyTransactions.totalPlus +
                  monthlyTransactions.preBalance
              ).toFixed(2)}{" "}
              {}
              {getSymbolFromCurrency(monthlyTransactions.currency)}
            </StatNumber>
            <StatHelpText>
              {Number(monthlyTransactions.preBalance).toFixed(2)}
              {getSymbolFromCurrency(monthlyTransactions.currency)} pre-existent
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Spend</StatLabel>
            <StatNumber color="red.500">
              {Number(monthlyTransactions.totalMinus).toFixed(2)}
              {getSymbolFromCurrency(monthlyTransactions.currency)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              {Number(monthlyTransactions.totalMinusPercentage).toFixed(2)}%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Income</StatLabel>
            <StatNumber color="green.500">
              {Number(monthlyTransactions.totalPlus).toFixed(2)}
              {getSymbolFromCurrency(monthlyTransactions.currency)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {Number(monthlyTransactions.totalPlusPercentage).toFixed(2)}%
            </StatHelpText>
          </Stat>

          <Stat>
            {/* // TODO: add ETF API, save option fragments to DB */}
            {/* https://marketstack.com/ */}
            <StatLabel>ETF</StatLabel>
            <StatNumber color="green.500">
              123
              {getSymbolFromCurrency(monthlyTransactions.currency)}
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              123
            </StatHelpText>
          </Stat>
        </StatGroup>
        <Box w="100%" h="200px">
          <BalanceChart data={transactions} />
        </Box>
      </Box>

      {Object.keys(monthlyTransactions.years)
        .reverse()
        .map(year => {
          return (
            <Box key={year}>
              <Heading as="h1" mb={5}>
                {year}
              </Heading>
              <SimpleGrid columns={2} spacing={10}>
                {Object.keys(monthlyTransactions.years[year].months)
                  .reverse()
                  .map(month => {
                    const monthStats = monthlyTransactions.years[year].months[month]
                    return (
                      <MonthGridItem
                        key={month + year}
                        currency={monthlyTransactions.currency}
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

type MonthGridItemProps = MonthlyTransactions["years"][string]["months"][string] & {
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
}: MonthGridItemProps) => {
  const [showTable, setShowTable] = useState(false)
  return (
    <Box>
      <Heading as="h1" mb={5}>
        {month}
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
      <Box w="100%" h="200px">
        <BalanceChart data={transactions} variant="small" />
      </Box>

      {showTable ? (
        <Box w="100%" h="400px">
          {/* // TODO: add categories to table itself */}
          <TransactionTable transactions={transactions} categories={[]} />
        </Box>
      ) : (
        <Button
          size="sm"
          isFullWidth
          variant="ghost"
          colorScheme="gray"
          color="gray.500"
          leftIcon={<Icon as={TableIcon} />}
          onClick={() => setShowTable(true)}
        >
          Show Transactions
        </Button>
      )}
    </Box>
  )
}
