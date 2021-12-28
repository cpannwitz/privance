import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { useState } from "react"
import { DateRangePicker as RangePicker, Range, RangeFocus, RangeKeyDict } from "react-date-range"

// https://github.com/hypeserver/react-date-range

interface DatePickerProps {
  startDate?: Date
  endDate?: Date
  onChange: (range: Range) => void
}

const DatePicker = ({ onChange, startDate, endDate }: DatePickerProps) => {
  const dateRangeKey = "DATERANGE"
  const defaultDateState = {
    startDate,
    endDate,
    key: dateRangeKey,
  }

  // TODO: initial date from current filter
  const [dateState, setDateState] = useState<Range>(defaultDateState)

  const [focusRange, setFocusRange] = useState<RangeFocus>([0, 0])

  function onDateRangeChange(range: RangeKeyDict) {
    setDateState(range[dateRangeKey])
    if (focusRange[1] === 1) {
      onChange(range[dateRangeKey])
    }
  }

  return (
    <RangePicker
      ranges={[dateState]}
      onChange={onDateRangeChange}
      focusedRange={focusRange}
      onRangeFocusChange={setFocusRange}
      // don't display static ranges, cause they're not triggered by focusRangeChange
      staticRanges={[]}
    />
  )
}

export default DatePicker
