import { useTable, useGlobalFilter } from "react-table"
import axios, { AxiosError } from "axios"
import { Box, useMultiStyleConfig, useToast } from "@chakra-ui/react"
import { useSWRConfig } from "swr"

import { TransactionWithCategories } from "../../types/types"
import getDefaultColumns from "./TransactionTableColumns"
import Searchbar from "../Searchbar/Searchbar"
import { Category, Prisma } from ".prisma/client"
import { useCallback, useMemo } from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"
import Autosizer from "react-virtualized-auto-sizer"

// https://react-table.tanstack.com/docs/installation

export type TableVariant = "preview" | "default"
interface TransactionTableProps {
  transactions: TransactionWithCategories[]
  categories: Category[]
  transformedTransactions?: number[]
  variant?: TableVariant
  updateTransaction?: (transaction: TransactionWithCategories) => void
}
const DEFAULTTRANSFORMATIONS: number[] = []
const TransactionTable = ({
  transactions,
  categories,
  transformedTransactions = DEFAULTTRANSFORMATIONS,
  variant = "default",
  updateTransaction,
}: TransactionTableProps) => {
  const tableStyles = useMultiStyleConfig("Table", { size: "sm" })
  const toast = useToast()
  const { mutate } = useSWRConfig()

  const onSelectCategories = useCallback(
    (transaction: TransactionWithCategories) => {
      if (variant === "preview" && updateTransaction) {
        updateTransaction(transaction)
      } else {
        axios
          .post<{ data: TransactionWithCategories }>(
            "/api/transactions/updateTransactionCategories",
            {
              id: transaction.id,
              categories: transaction.categories.map(cat => cat.id),
            }
          )
          .then(res => {
            toast({
              title: `Updated your Transaction!`,
              status: "success",
            })

            // ! causes performance issues
            const updatedTransaction = res.data.data
            mutate(
              `/api/transactions/getTransactions`,
              async (transactions: { data: TransactionWithCategories[] }) => {
                const index = transactions.data.findIndex(val => val.id === updatedTransaction.id)
                const updatedData = [...transactions.data]
                updatedData[index] = updatedTransaction
                // return transactions
                return { data: updatedData }
              },
              false
            )
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
    [updateTransaction, variant, mutate, toast]
  )

  // TODO: move categories in getColumns? or smth else...
  const columns = useMemo(() => {
    return getDefaultColumns({ categories, onSelectCategories })
  }, [categories, onSelectCategories])

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

export default TransactionTable

export function isTransactionWithCategories(
  transaction: TransactionWithCategories | Prisma.TransactionCreateInput
): transaction is TransactionWithCategories {
  return "id" in transaction
}
