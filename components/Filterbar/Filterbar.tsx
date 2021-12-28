import {
  Box,
  Stack,
  Icon,
  IconButton,
  Button,
  Select,
  Switch,
  FormControl,
  FormLabel,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react"
import DateRangePicker from "../DatePicker/DateRangePicker"

import ClearIcon from "remixicon-react/CloseCircleLineIcon"

interface DefaultFilterState {
  sortDirection: "asc" | "desc"
  startDate?: Date
  endDate?: Date
  onlyIncome: boolean
  onlySpending: boolean
}

interface FilterbarProps {
  filterState: DefaultFilterState
  onChange: (newState: Partial<DefaultFilterState>) => void
}

// TODO: extract onC functions
const Filterbar = ({ filterState, onChange }: FilterbarProps) => {
  return (
    <Stack direction="row" p={3} mb={2}>
      <Select
        value={filterState.sortDirection}
        onChange={e => onChange({ sortDirection: e.target.value as "asc" | "desc" })}
      >
        <option value="asc">Sort ASC</option>
        <option value="desc">Sort DESC</option>
      </Select>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="only-income" mb="0">
          Only Income
        </FormLabel>
        <Switch
          id="only-income"
          isChecked={filterState.onlyIncome}
          onChange={e => onChange({ onlyIncome: e.target.checked })}
        />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="only-spending" mb="0">
          Only Spending
        </FormLabel>
        <Switch
          id="only-spending"
          isChecked={filterState.onlySpending}
          onChange={e => onChange({ onlySpending: e.target.checked })}
        />
      </FormControl>
      <Box d="flex">
        <Popover isLazy placement="bottom-start">
          <PopoverTrigger>
            <Button size="sm" w="12rem">
              {filterState.startDate && filterState.endDate ? (
                <span>
                  {new Date(filterState.startDate).toLocaleDateString()}
                  &nbsp;-&nbsp;
                  {new Date(filterState.endDate).toLocaleDateString()}
                </span>
              ) : (
                <span>Filter by date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent w="auto">
            <DateRangePicker
              startDate={filterState.startDate}
              endDate={filterState.endDate}
              onChange={({ startDate, endDate }) => onChange({ startDate, endDate })}
            />
          </PopoverContent>
        </Popover>
        <IconButton
          aria-label="clear date range"
          variant="ghost"
          size="sm"
          icon={<Icon as={ClearIcon} boxSize={4} />}
          onClick={() => onChange({ startDate: undefined, endDate: undefined })}
        />
      </Box>
    </Stack>
  )
}

export default Filterbar
