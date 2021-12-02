import { useTable, useGlobalFilter } from "react-table"

import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  // Tfoot,
  // TableCaption,
  Box,
} from "@chakra-ui/react"

import { TransactionWithCategories } from "../../types/types"
import { getColumns } from "./DatatableColumns"
import Searchbar from "../Searchbar/Searchbar"
import { Category } from ".prisma/client"
import { useMemo } from "react"

// https://react-table.tanstack.com/docs/installation

interface DatatableProps {
  transactions: TransactionWithCategories[]
  categories: Category[]
}

const Datatable = ({ transactions, categories }: DatatableProps) => {
  const columns = useMemo(() => getColumns({ categories }), [categories])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: transactions || [],
    },
    useGlobalFilter
  )

  return (
    <>
      <Box w="100%" p={2}>
        <Searchbar filterValue={state.globalFilter as string} setFilterValue={setGlobalFilter} />
      </Box>
      <Table {...getTableProps()} variant="striped" size="md">
        <Thead>
          {headerGroups.map(headerGroup => {
            const headerProps = headerGroup.getHeaderGroupProps()
            return (
              <Tr {...headerProps} key={headerProps.key}>
                {headerGroup.headers.map(column => {
                  const columnHeaderProps = column.getHeaderProps()
                  return (
                    <Th
                      {...columnHeaderProps}
                      key={columnHeaderProps.key}
                      style={{
                        width: column.width,
                      }}
                    >
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
                    <Td
                      {...cellProps}
                      key={cellProps.key}
                      style={{
                        width: cell.column.width,
                      }}
                    >
                      {cell.render("Cell")}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

export default Datatable
