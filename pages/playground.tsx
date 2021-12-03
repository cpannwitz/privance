import type { InferGetStaticPropsType } from "next"
import { useMemo } from "react"
import { useTable, Column } from "react-table"

import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  // Tfoot,
  // TableCaption,
  useMultiStyleConfig,
  useTheme,
  Flex,
} from "@chakra-ui/react"

export const getStaticProps = async () => {
  return { props: {} }
}

const PlaygroundPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <TableOne />
      <TableTwo />
    </>
  )
}

export default PlaygroundPage

const TableOne = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "john",
        age: 20,
      },
      {
        id: 2,
        name: "fred",
        age: 17,
      },
      {
        id: 3,
        name: "lisa",
        age: 35,
      },
      {
        id: 4,
        name: "agnes",
        age: 74,
      },
    ],
    []
  )
  const columns: Column<{ id: number; name: string; age: number }>[] = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        id: "id",
      },
      {
        Header: "name",
        accessor: "name",
        id: "name",
      },
      {
        Header: "age",
        accessor: "age",
        id: "age",
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: data,
  })
  const theme = useTheme()
  console.log(`LOG |  ~ file: playground.tsx ~ line 86 ~ TableOne ~ theme`, theme)
  const tableStyles = useMultiStyleConfig("Table", { size: "md", variant: "striped" })

  return (
    <Flex __css={tableStyles.table} {...getTableProps()}>
      <Flex __css={tableStyles.thead}>
        {headerGroups.map(headerGroup => {
          const headerProps = headerGroup.getHeaderGroupProps()
          return (
            <Flex __css={tableStyles.tr} d="flex" {...headerProps} key={headerProps.key}>
              {headerGroup.headers.map(column => {
                const columnHeaderProps = column.getHeaderProps()
                return (
                  <Flex
                    __css={tableStyles.th}
                    flex="1"
                    {...columnHeaderProps}
                    key={columnHeaderProps.key}
                  >
                    {column.render("Header")}
                  </Flex>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
      <Flex __css={tableStyles.tbody} {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          const rowProps = row.getRowProps()
          return (
            <Flex __css={tableStyles.tr} d="flex" {...rowProps} key={rowProps.key}>
              {row.cells.map(cell => {
                const cellProps = cell.getCellProps()
                return (
                  <Flex __css={tableStyles.td} flex="1" {...cellProps} key={cellProps.key}>
                    {cell.render("Cell")}
                  </Flex>
                )
              })}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}
const TableTwo = () => {
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "john",
        age: 20,
      },
      {
        id: 2,
        name: "fred",
        age: 17,
      },
      {
        id: 3,
        name: "lisa",
        age: 35,
      },
      {
        id: 4,
        name: "agnes",
        age: 74,
      },
    ],
    []
  )
  const columns: Column<{ id: number; name: string; age: number }>[] = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        id: "id",
      },
      {
        Header: "name",
        accessor: "name",
        id: "name",
      },
      {
        Header: "age",
        accessor: "age",
        id: "age",
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: data,
  })

  return (
    <Table {...getTableProps()} variant="striped" size="md">
      <Thead>
        {headerGroups.map(headerGroup => {
          const headerProps = headerGroup.getHeaderGroupProps()
          return (
            <Tr {...headerProps} key={headerProps.key}>
              {headerGroup.headers.map(column => {
                const columnHeaderProps = column.getHeaderProps()
                return (
                  <Th {...columnHeaderProps} key={columnHeaderProps.key}>
                    {column.render("Header")}
                  </Th>
                )
              })}
            </Tr>
          )
        })}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          const rowProps = row.getRowProps()
          return (
            <Tr {...rowProps} key={rowProps.key}>
              {row.cells.map(cell => {
                const cellProps = cell.getCellProps()
                return (
                  <Td {...cellProps} key={cellProps.key}>
                    {cell.render("Cell")}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
