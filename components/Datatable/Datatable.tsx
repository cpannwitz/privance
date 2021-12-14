import { useTable, useGlobalFilter } from "react-table"

import { Box, useMultiStyleConfig } from "@chakra-ui/react"

import { TransactionWithCategories } from "../../types/types"
import { getColumns } from "./DatatableColumns"
import Searchbar from "../Searchbar/Searchbar"
import { Category, Prisma } from ".prisma/client"
import { useCallback, useMemo } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import Autosizer from "react-virtualized-auto-sizer"

// https://react-table.tanstack.com/docs/installation

interface DatatableProps {
  transactions: TransactionWithCategories[]
  categories: Category[]
  transformedTransactions?: number[]
}

const Datatable = ({ transactions, categories, transformedTransactions = [] }: DatatableProps) => {
  const tableStyles = useMultiStyleConfig("Table", { size: "sm" })

  // TODO: move categories in getColumns? or smth else...
  // TODO: if transaction is without ID (Prisma.TransactionCreateInput) -> need solution with categoryrenderer
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

  const RenderRow = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const row = rows[index]
      if (!row) return null
      prepareRow(row)
      const background =
        isTransactionWithCategories(row.original) &&
        transformedTransactions.includes(row.original.id)
          ? "#edf7ed"
          : undefined
      const rowProps = row.getRowProps({ style: { ...style, background } })
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
    },
    [prepareRow, rows, tableStyles, transformedTransactions]
  )

  return (
    <>
      <Box w="100%" h="4rem">
        <Searchbar filterValue={state.globalFilter as string} setFilterValue={setGlobalFilter} />
      </Box>
      <Box __css={tableStyles.table} {...getTableProps()} h="calc(100% - 5rem)">
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
                itemCount={rows.length}
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

export default Datatable

export function isTransactionWithCategories(
  transaction: TransactionWithCategories | Prisma.TransactionCreateInput
): transaction is TransactionWithCategories {
  return "id" in transaction
}
