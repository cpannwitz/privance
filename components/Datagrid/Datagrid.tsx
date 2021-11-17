import { AccountChange } from ".prisma/client"
import { Column, useTable } from "react-table"
import { Table } from "@mantine/core"

// ! Missing Category!

// Alternative datagrids:
// https://github.com/glideapps/glide-data-grid
// https://reactdatagrid.io/
// https://mui.com/components/data-grid/editing/
// https://github.com/adazzle/react-data-grid

const columns: Column<AccountChange>[] = [
  {
    Header: "Date",
    accessor: "issuedate",
  },
  {
    Header: "Issuer",
    accessor: "issuer",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "Purpose",
    accessor: "purpose",
  },
  {
    Header: "Balance",
    accessor: "balance",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Currency",
    accessor: "currency",
  },
  // {
  //   Header: 'Categories',
  //   accessor: ''
  // },
]

interface DatagridProps {
  data: AccountChange[]
}

const Datagrid = ({ data }: DatagridProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<AccountChange>({ columns, data })
  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} key={cell.value}>
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default Datagrid
