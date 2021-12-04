import { useTable, useGlobalFilter } from "react-table"

import { Box, useMultiStyleConfig } from "@chakra-ui/react"

import { TransactionWithCategories } from "../../types/types"
import { getColumns } from "./DatatableColumns"
import Searchbar from "../Searchbar/Searchbar"
import { Category } from ".prisma/client"
import { memo, useMemo } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import Autosizer from "react-virtualized-auto-sizer"

// https://react-table.tanstack.com/docs/installation

interface DatatableDivProps {
  transactions: TransactionWithCategories[]
  categories: Category[]
}

const DatatableDiv = ({ transactions, categories }: DatatableDivProps) => {
  const tableStyles = useMultiStyleConfig("Table", { size: "sm" })

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

  const RenderRow = memo(({ index, style }: ListChildComponentProps) => {
    const row = rows[index]
    prepareRow(row)
    const rowProps = row.getRowProps({ style })
    return (
      <Box
        {...rowProps}
        key={rowProps.key}
        __css={tableStyles.tr}
        d="grid"
        gridTemplateColumns={row.cells.map(cell => cell.column.width).join(" ")}
      >
        {row.cells.map(cell => {
          const cellProps = cell.getCellProps()
          return (
            <Box
              {...cellProps}
              key={cellProps.key}
              __css={tableStyles.td}
              d="flex"
              alignItems="center"
            >
              {cell.render("Cell")}
            </Box>
          )
        })}
      </Box>
    )
  })
  RenderRow.displayName = "RenderRow"
  // [prepareRow, rows, tableStyles]

  return (
    <>
      <Box w="100%" p={2}>
        <Searchbar filterValue={state.globalFilter as string} setFilterValue={setGlobalFilter} />
      </Box>
      <Box __css={tableStyles.table} {...getTableProps()} h="88vh">
        <Box __css={tableStyles.thead}>
          {headerGroups.map(headerGroup => {
            const headerProps = headerGroup.getHeaderGroupProps()
            return (
              <Box
                {...headerProps}
                key={headerProps.key}
                __css={tableStyles.tr}
                d="grid"
                gridTemplateColumns={headerGroup.headers.map(col => col.width).join(" ")}
              >
                {headerGroup.headers.map(column => {
                  const columnHeaderProps = column.getHeaderProps()
                  return (
                    <Box
                      {...columnHeaderProps}
                      key={columnHeaderProps.key}
                      __css={tableStyles.th}
                      d="flex"
                      alignItems="center"
                    >
                      {column.render("Header")}
                    </Box>
                  )
                })}
              </Box>
            )
          })}
        </Box>
        <Box __css={tableStyles.tbody} {...getTableBodyProps()} h="100%">
          <Autosizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                itemCount={transactions.length}
                itemSize={65}
                overscanCount={40}
                width={width}
              >
                {RenderRow}
              </FixedSizeList>
            )}
          </Autosizer>
        </Box>
      </Box>
    </>
  )
}

export default DatatableDiv
