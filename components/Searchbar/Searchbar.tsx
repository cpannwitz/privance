import { ChangeEvent, useState } from "react"
import { useAsyncDebounce } from "react-table"

import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/SearchOutlined"
import ClearIcon from "@mui/icons-material/ClearOutlined"

interface SearchbarProps {
  filterValue?: string
  setFilterValue?: (value: string) => void
}

const Searchbar = ({ filterValue = "", setFilterValue = () => {} }: SearchbarProps) => {
  const [searchValue, setSearchValue] = useState(filterValue)

  const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    propagateSearchValue(e.target.value)
  }

  const propagateSearchValue = useAsyncDebounce(value => {
    setFilterValue(value || undefined)
  }, 300)

  const clearSearchValue = () => {
    setSearchValue("")
    propagateSearchValue("")
  }

  return (
    <TextField
      fullWidth
      placeholder="Search for transactions"
      size="small"
      value={searchValue}
      onChange={onSearchValueChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              size="small"
              edge="end"
              onClick={clearSearchValue}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  )
}

export default Searchbar
