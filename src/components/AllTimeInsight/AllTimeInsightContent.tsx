import { AllTimeAggregations } from '../../types/types'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import getSymbolFromCurrency from 'currency-map-symbol'
import BalanceChart from '../Charts/BalanceChart'
import CategoriesCharts from '../Charts/CategoriesChart'
import Stat from '../Stat/Stat'

interface AllTimeInsightContentProps {
  allTimeAggregations: AllTimeAggregations
}

const AllTimeInsightContent = ({ allTimeAggregations }: AllTimeInsightContentProps) => {
  return (
    <Box>
      <Typography fontSize={32} sx={{ mb: 4 }}>
        Overall
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '& > *': { mr: 2 }
        }}
      >
        <Stat
          heading="Total Gain/Loss"
          label={`${Number(allTimeAggregations.totalMinus + allTimeAggregations.totalPlus).toFixed(
            2
          )} ${getSymbolFromCurrency(allTimeAggregations.currency)}`}
          sublabel={`${new Date(allTimeAggregations.startDate).toLocaleDateString()} - ${new Date(
            allTimeAggregations.endDate
          ).toLocaleDateString()}`}
          isPositive={
            Math.abs(allTimeAggregations.totalMinus) < Math.abs(allTimeAggregations.totalPlus)
          }
        />

        <Stat
          heading="Current Balance"
          label={`${Number(
            allTimeAggregations.totalMinus +
              allTimeAggregations.totalPlus +
              allTimeAggregations.preBalance
          ).toFixed(2)} ${getSymbolFromCurrency(allTimeAggregations.currency)}`}
          sublabel={`${Number(allTimeAggregations.preBalance).toFixed(2)} ${getSymbolFromCurrency(
            allTimeAggregations.currency
          )} pre-existent`}
          isPositive={
            Math.abs(allTimeAggregations.totalMinus) < Math.abs(allTimeAggregations.totalPlus)
          }
        />

        <Stat
          heading="Spend"
          label={`${Number(allTimeAggregations.totalMinus).toFixed(2)} ${getSymbolFromCurrency(
            allTimeAggregations.currency
          )}`}
          sublabel={`${Number(allTimeAggregations.totalMinusPercentage).toFixed(2)}%`}
          isPositive={false}
        />

        <Stat
          heading="Income"
          label={`${Number(allTimeAggregations.totalPlus).toFixed(2)} ${getSymbolFromCurrency(
            allTimeAggregations.currency
          )}`}
          sublabel={`${Number(allTimeAggregations.totalPlusPercentage).toFixed(2)}%`}
          isPositive={true}
        />
      </Box>
      <Box sx={{ width: '100%', height: 200 }}>
        <BalanceChart data={allTimeAggregations.transactions} />
      </Box>
      <Box sx={{ width: '100%', height: 300 }}>
        <CategoriesCharts categories={allTimeAggregations.categories} />
      </Box>
    </Box>
  )
}

export default AllTimeInsightContent
