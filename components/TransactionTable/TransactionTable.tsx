import { useTable, useGlobalFilter } from "react-table"
import axios, { AxiosError } from "axios"
import { Box, useMultiStyleConfig, useToast, useColorMode } from "@chakra-ui/react"
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
  const tableStyles = useMultiStyleConfig("Table", { size: "sm" })
  const toast = useToast()
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

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
            toast({
              title: `Updated your Transaction!`,
              status: "success",
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
              toast({
                title: `Couldn't update your transaction: ${error.response.data.error}`,
                status: "error",
              })
            }
          })
      }
    },
    [updateTransaction, variant, toast, mutateTransactions]
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
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: (transactions as TransactionWithCategory[]) || [],
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
          ? isDark
            ? "#1c321c"
            : "#edf7ed"
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
    [prepareRow, rows, tableStyles, transformedTransactions, isDark]
  )
  // TODO: optimize Table for narrow display (monthly)
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

export default TransactionTable

export function isTransactionWithCategories(
  transaction: TransactionWithCategory | TransactionBeforeUpload
): transaction is TransactionWithCategory {
  return "id" in transaction
}
