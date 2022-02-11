import Box from "@mui/material/Box"
import Switch from "@mui/material/Switch"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Popover from "@mui/material/Popover"

import { usePopupState, bindTrigger, bindPopover } from "material-ui-popup-state/hooks"

import DateRangePicker from "../DatePicker/DateRangePicker"

import CancelIcon from "@mui/icons-material/CancelOutlined"

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
  const popupState = usePopupState({
    variant: "popover",
    popupId: "categorySelect",
  })
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 1, mb: 2 }}>
      <Select
        placeholder="Sort Direction"
        onChange={e => onChange({ sortDirection: e.target.value as "asc" | "desc" })}
        value={filterState.sortDirection}
      >
        <MenuItem value="asc">Sort ASC</MenuItem>
        <MenuItem value="desc">Sort DESC</MenuItem>
      </Select>

      <Box sx={{ display: "flex" }}>
        <FormGroup>
          <FormControlLabel
            label="Only Income"
            control={
              <Switch
                checked={filterState.onlyIncome}
                onChange={e => onChange({ onlyIncome: e.target.checked })}
              />
            }
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            label="Only Spending"
            control={
              <Switch
                checked={filterState.onlySpending}
                onChange={e => onChange({ onlySpending: e.target.checked })}
              />
            }
          />
        </FormGroup>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Button size="small" sx={{ width: "12rem" }} {...bindTrigger(popupState)}>
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
        <Popover {...bindPopover(popupState)}>
          <DateRangePicker
            startDate={filterState.startDate}
            endDate={filterState.endDate}
            onChange={({ startDate, endDate }) => onChange({ startDate, endDate })}
          />
        </Popover>
        <IconButton
          aria-label="clear date range"
          onClick={() => onChange({ startDate: undefined, endDate: undefined })}
        >
          <CancelIcon />
        </IconButton>
      </Box>
    </Stack>
  )
}

export default Filterbar
