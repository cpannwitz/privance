import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { debounce } from '@mui/material'

interface QuicksearchProps {
  clearSearch: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

const Quicksearch = ({ clearSearch, onChange, value }: QuicksearchProps) => {
  const [textValue, setTextValue] = useState(value)
  function onTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextValue(e.target.value)
    onDebouncedChange(e)
  }

  const onDebouncedChange = debounce(event => onChange(event), 500)
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0
      }}
    >
      <TextField
        autoFocus={true}
        variant="standard"
        value={textValue}
        onChange={onTextChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: value ? 'visible' : 'hidden' }}
              onClick={clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto'
          },
          m: theme => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider'
          }
        }}
      />
    </Box>
  )
}

export default Quicksearch
