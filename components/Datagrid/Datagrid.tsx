import { Column, useTable } from "react-table"
import { Table } from "@mantine/core"
import { AccountChangeWithCategories } from "../../types/types"

// ! Missing Category!

// Alternative datagrids:
// https://github.com/glideapps/glide-data-grid
// https://reactdatagrid.io/
// https://mui.com/components/data-grid/editing/
// https://github.com/adazzle/react-data-grid
// https://github.com/react-component/table

const columns: Column<AccountChangeWithCategories>[] = [
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
  {
    Header: "Categories",
    accessor: "categories",
  },
]

interface DatagridProps {
  data: AccountChangeWithCategories[]
}

const Datagrid = ({ data }: DatagridProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<AccountChangeWithCategories>({ columns, data })
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
