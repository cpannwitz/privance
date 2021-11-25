import { useTable } from "react-table"

import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  // Tfoot,
  // TableCaption,
} from "@chakra-ui/react"

import { TransactionWithCategories } from "../../types/types"
import { columns } from "./DatatableColumns"

// https://react-table.tanstack.com/docs/installation

interface DatatableProps {
  data: TransactionWithCategories[]
}

const Datatable = ({ data }: DatatableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: data || [],
  })

  return (
    <Table {...getTableProps()}>
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

export default Datatable
