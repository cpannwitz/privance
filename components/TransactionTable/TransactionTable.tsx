import { useTable, useGlobalFilter, useRowSelect, UseRowSelectRowProps } from "react-table"
import axios, { AxiosError } from "axios"

import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"

import TableRow from "@mui/material/TableRow"
import TableBody from "@mui/material/TableBody"
import TableHead from "@mui/material/TableHead"
import TableCell from "@mui/material/TableCell"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

import { useTheme } from "@mui/material/styles"
import { useSnackbar } from "notistack"

import { KeyedMutator } from "swr"

import { TransactionBeforeUpload, TransactionWithCategory } from "../../types/types"
import getDefaultColumns from "./TransactionTableColumns"
import Searchbar from "../Searchbar/Searchbar"
import { useCallback, useMemo } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import Autosizer from "react-virtualized-auto-sizer"

// https://react-table.tanstack.com/docs/installation

export type TableVariant = "preview" | "default"
interface TransactionTableProps {
  transactions: TransactionWithCategory[] | TransactionBeforeUpload[]
  transformedTransactions?: number[]
  variant?: TableVariant
  updateTransaction?: (transaction: TransactionBeforeUpload) => void
  mutateTransactions?: KeyedMutator<{
    data: TransactionWithCategory[]
  }>
}
const DEFAULTTRANSFORMEDTRANSACTIONS: number[] = []
const TransactionTable = ({
  transactions,
  transformedTransactions = DEFAULTTRANSFORMEDTRANSACTIONS,
  variant = "default",
  updateTransaction,
  mutateTransactions,
}: TransactionTableProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    palette: { mode },
  } = useTheme()
  const isDark = mode === "dark"

  const onSelectCategory = useCallback(
    (transaction: TransactionWithCategory) => {
      if (variant === "preview" && updateTransaction) {
        updateTransaction(transaction as TransactionBeforeUpload)
      } else {
        axios
          .post<{ data: TransactionWithCategory }>("/api/transactions/updateTransactionCategory", {
            id: transaction.id,
            category: transaction.category ? transaction.category.id : undefined,
          })
          .then(res => {
            enqueueSnackbar(`Updated your Transaction!`, {
              variant: "success",
            })

            // TODO: ! causes performance issues
            if (mutateTransactions) {
              const updatedTransaction = res.data.data
              mutateTransactions(async transactions => {
                if (transactions) {
                  const index = transactions.data.findIndex(val => val.id === updatedTransaction.id)
                  const updatedData = [...transactions.data]
                  updatedData[index] = updatedTransaction
                  return { data: updatedData }
                }
                return transactions
              }, false)
            }
          })
          .catch((error: AxiosError) => {
            if (error.response) {
              enqueueSnackbar(`Couldn't update your transaction: ${error.response.data.error}`, {
                variant: "error",
              })
            }
          })
      }
    },
    [updateTransaction, variant, enqueueSnackbar, mutateTransactions]
  )

  const columns = useMemo(() => {
    return getDefaultColumns({ onSelectCategory })
  }, [onSelectCategory])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter, selectedRowIds },
    setGlobalFilter,
  } = useTable<TransactionWithCategory>(
    {
      columns: columns,
      data: (transactions as TransactionWithCategory[]) || [],
    },
    useGlobalFilter,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: "selection",
          width: "3%",
          Header: ({ getToggleAllRowsSelectedProps }) => {
            const { indeterminate, checked, ...props } = getToggleAllRowsSelectedProps()
            return <Checkbox {...props} checked={checked} indeterminate={indeterminate} />
          },
          Cell: ({ row }: { row: UseRowSelectRowProps<object> }) => {
            const { indeterminate, checked, ...props } = row.getToggleRowSelectedProps()
            return <Checkbox {...props} checked={checked} indeterminate={indeterminate} />
          },
        },
        ...columns,
      ])
    }
  )

  const RenderRow = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const row = rows[index]
      if (!row) return null
      prepareRow(row)
      const background =
        isTransactionWithCategories(row.original) &&
        transformedTransactions.includes(row.original.id)
          ? isDark
            ? "#1c321c"
            : "#edf7ed"
          : undefined
      const rowProps = row.getRowProps({ style: { ...style, background } })
      return (
        <TableRow
          component="div"
          // {...rowProps}
          key={rowProps.key}
          sx={{
            display: "grid",
            gridTemplateColumns: row.cells.map(cell => cell.column.width).join(" "),
          }}
        >
          {row.cells.map(cell => {
            const cellProps = cell.getCellProps()
            return (
              <TableCell
                component="div"
                // {...cellProps}
                key={cellProps.key}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {cell.render("Cell")}
              </TableCell>
            )
          })}
        </TableRow>
      )
    },
    [prepareRow, rows, transformedTransactions, isDark, selectedRowIds]
  )
  // TODO: optimize Table for narrow display (monthly)
  return (
    <>
      <Box sx={{ width: "100%", height: "4rem" }}>
        <Searchbar filterValue={globalFilter as string} setFilterValue={setGlobalFilter} />
      </Box>
      <TableContainer sx={{ height: "calc(100% - 8rem)" }}>
        <Table component="div" {...getTableProps()} sx={{ height: "100%" }}>
          <TableHead component="div">
            {headerGroups.map(headerGroup => {
              const headerProps = headerGroup.getHeaderGroupProps()
              return (
                <TableRow
                  component="div"
                  // {...headerProps}
                  key={headerProps.key}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: headerGroup.headers.map(col => col.width).join(" "),
                  }}
                  // gridTemplateColumns={headerGroup.headers.map(col => col.width).join(" ")}
                >
                  {headerGroup.headers.map(column => {
                    const columnHeaderProps = column.getHeaderProps()
                    return (
                      <TableCell
                        component="div"
                        // {...columnHeaderProps}
                        key={columnHeaderProps.key}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {column.render("Header")}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableHead>
          <TableBody {...getTableBodyProps()} component="div" sx={{ height: "100%" }}>
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
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TransactionTable

export function isTransactionWithCategories(
  transaction: TransactionWithCategory | TransactionBeforeUpload
): transaction is TransactionWithCategory {
  return "id" in transaction
}
