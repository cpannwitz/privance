import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  IconButton,
} from "@chakra-ui/react"
import SearchIcon from "remixicon-react/SearchLineIcon"
import ClearIcon from "remixicon-react/CloseCircleLineIcon"
import { useState } from "react"
import { useAsyncDebounce } from "react-table"

interface SearchbarProps {
  filterValue: string
  setFilterValue: (value: string) => void
}

const Searchbar = ({ filterValue, setFilterValue }: SearchbarProps) => {
  const [searchValue, setSearchValue] = useState(filterValue || "")

  const onSearchValueChange = useAsyncDebounce(value => {
    setFilterValue(value || undefined)
  }, 200)
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={SearchIcon} />
      </InputLeftElement>
      <Input
        placeholder="Search for transactions"
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value)
          onSearchValueChange(e.target.value)
        }}
      />
      <InputRightElement
        onClick={() => {
          setSearchValue("")
          onSearchValueChange("")
        }}
      >
        <IconButton
          aria-label="clear search"
          icon={<Icon as={ClearIcon} boxSize={4} />}
          variant="ghost"
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default Searchbar
