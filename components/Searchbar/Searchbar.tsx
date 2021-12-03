import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react"
import SearchIcon from "remixicon-react/SearchLineIcon"
import { useState } from "react"
import { useAsyncDebounce } from "react-table"

interface SearchbarProps {
  filterValue: string
  setFilterValue: (value: string) => void
}

const Searchbar = ({ filterValue, setFilterValue }: SearchbarProps) => {
  const [searchValue, setSearchValue] = useState(filterValue)

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
    </InputGroup>
  )
}

export default Searchbar