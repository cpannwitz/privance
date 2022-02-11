import { useState } from "react"
import { MonthlyAggregations } from "../../types/types"

import getSymbolFromCurrency from "currency-map-symbol"
import BalanceChart from "../Charts/BalanceChart"
import CategoriesCharts from "../Charts/CategoriesChart"
import TransactionTable from "../TransactionTable/TransactionTable"
import Stat from "../Stat/Stat"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import TableIcon from "@mui/icons-material/TableChartOutlined"

interface MonthlyInsightGridProps {
  monthlyAggregations: MonthlyAggregations
}

const MonthlyInsightGrid = ({ monthlyAggregations }: MonthlyInsightGridProps) => {
  return (
    <Stack direction="column" sx={{ p: 5 }}>
      {Object.keys(monthlyAggregations.years)
        .reverse()
        .map(year => {
          return (
            <Box key={year}>
              <Typography fontSize={30} sx={{ mb: 5 }}>
                {year}
              </Typography>
              <Grid container columns={2} spacing={10}>
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
              </Grid>
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
    <Grid item xs={1}>
      <Typography fontSize={24} sx={{ mb: 5 }}>
        {getMonthName(month)}
      </Typography>

      <Stack direction="row" spacing={3}>
        <Stat
          heading="Total Gain/Loss"
          label={`${Number(totalMonthMinus + totalMonthPlus).toFixed(2)} ${getSymbolFromCurrency(
            currency
          )}`}
          sublabel=""
          color={
            Math.abs(totalMonthMinus) > Math.abs(totalMonthPlus) ? "error.main" : "success.main"
          }
        />

        <Stat
          heading="Spend"
          label={`${Number(totalMonthMinus).toFixed(2)} ${getSymbolFromCurrency(currency)}`}
          sublabel={`${Number(totalMonthMinusPercentage).toFixed(2)}%`}
          color="error.main"
        />

        <Stat
          heading="Income"
          label={`${Number(totalMonthPlus).toFixed(2)} ${getSymbolFromCurrency(currency)}`}
          sublabel={`${Number(totalMonthPlusPercentage).toFixed(2)}%`}
          color="success.main"
        />
      </Stack>
      {transactions.length > 0 && (
        <Box sx={{ width: "100%", height: "200px" }}>
          <BalanceChart data={transactions} variant="small" />
        </Box>
      )}
      {categories.length > 0 && (
        <Box sx={{ width: "100%", height: "200px" }}>
          <CategoriesCharts categories={categories} />
        </Box>
      )}

      <Button
        size="small"
        fullWidth
        variant="text"
        color="secondary"
        startIcon={<TableIcon />}
        onClick={() => setShowTable(v => !v)}
      >
        Show Transactions
      </Button>
      {showTable && (
        <Box sx={{ width: "100%", height: "200px", mt: 3 }}>
          <TransactionTable transactions={transactions} />
        </Box>
      )}
    </Grid>
  )
}

function getMonthName(month: number, locale = "en") {
  return new Intl.DateTimeFormat(locale, { month: "long" }).format(new Date().setMonth(month))
}
