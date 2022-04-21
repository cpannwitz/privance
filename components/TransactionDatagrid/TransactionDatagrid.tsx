import { useMemo, useState } from "react"
import {
  DataGrid,
  GridCellParams,
  GridFilterInputSingleSelect,
  GridFilterItem,
  GridSelectionModel,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid"
import type { GridColDef } from "@mui/x-data-grid"

import Box from "@mui/material/Box"

import { TransactionWithCategory } from "../../types/types"

import dayjs from "dayjs"
import {
  TextRenderer,
  AmountRenderer,
  BalanceRenderer,
  CategoryEditRenderer,
} from "./ColumnRenderer"
import { Category } from "@prisma/client"
import CategorySelect from "../CategorySelect/CategorySelect"

interface TransactionDatagridProps {
  transactions: TransactionWithCategory[]
  categories?: Category[]
  transformedTransactions?: number[]
  onUpdateTransaction?: (transcation: TransactionWithCategory) => void
}

const DEFAULTTRANSFORMEDTRANSACTIONS: number[] = []

const TransactionDatagrid = ({
  transactions,
  categories = [],
  transformedTransactions = DEFAULTTRANSFORMEDTRANSACTIONS,
  onUpdateTransaction,
}: TransactionDatagridProps) => {
  const [multiTransactionSelection, setMultiTransactionSelection] = useState<GridSelectionModel>([])

  function onMultiCategoryChange(category: Category | null) {
    if (onUpdateTransaction && multiTransactionSelection.length > 0) {
      multiTransactionSelection.forEach(selectedTransaction => {
        const baseTransaction = transactions.find(
          transaction => transaction.id === selectedTransaction
        )
        if (baseTransaction) {
          onUpdateTransaction({ ...baseTransaction, category })
        }
      })
    }

    setMultiTransactionSelection([])
  }

  const columns = useMemo(
    () =>
      [
        {
          headerName: "Date",
          description: "Date",
          field: "issuedate",
          type: "date",
          flex: 0.1,
          valueFormatter: p => dayjs(p.value as string).format("D. MMM YYYY"),
          renderHeader: p => <b>{p.colDef.headerName}</b>,
          renderCell: TextRenderer,
        },
        {
          headerName: "Issuer",
          description: "Issuer",
          field: "issuer",
          type: "string",
          flex: 0.15,
          renderHeader: p => <b>{p.colDef.headerName}</b>,
          renderCell: TextRenderer,
        },
        {
          headerName: "Type",
          description: "Type",
          field: "type",
          type: "string",
          flex: 0.1,
          renderHeader: p => <b>{p.colDef.headerName}</b>,
          renderCell: TextRenderer,
        },
        {
          headerName: "Purpose",
          description: "Purpose",
          field: "purpose",
          type: "string",
          flex: 0.25,
          renderHeader: p => <b>{p.colDef.headerName}</b>,
          renderCell: TextRenderer,
        },
        {
          headerName: "Category",
          description: "Category",
          field: "category",
          flex: 0.1,
          type: "singleSelect",
          valueOptions: categories ? categories.map(c => c.name) : [],
          filterOperators: [
            {
              value: "is",
              label: "is",
              getApplyFilterFn: (filterItem: GridFilterItem) => {
                if (!filterItem.value) return

                return ({ value }: GridCellParams): boolean => {
                  if (!value) return false
                  if (typeof value === "object") {
                    return filterItem.value === value.name
                  }
                  return filterItem.value === value
                }
              },
              InputComponent: GridFilterInputSingleSelect,
              InputComponentProps: { type: "singleSelect" },
            },
            {
              value: "isnot",
              label: "is not",
              getApplyFilterFn: (filterItem: GridFilterItem) => {
                if (!filterItem.value) return

                return ({ value }: GridCellParams): boolean => {
                  if (!value) return false
                  if (typeof value === "object") {
                    return filterItem.value !== value.name
                  }
                  return filterItem.value !== value
                }
              },
              InputComponent: GridFilterInputSingleSelect,
              InputComponentProps: { type: "singleSelect" },
            },
            {
              label: "is empty",
              value: "is empty",
              getApplyFilterFn: () => {
                return ({ value }: GridCellParams): boolean => {
                  if (!value) return true
                  return false
                }
              },
            },
          ],
          renderHeader: p => <b>{p.colDef.headerName}</b>,
          renderCell: p => (
            <CategoryEditRenderer {...p} onUpdateTransaction={onUpdateTransaction} />
          ),
        },
        {
          headerName: "Balance",
          description: "Balance",
          field: "balance",
          type: "number",
          flex: 0.1,
          renderHeader: p => <b>{p.colDef.headerName}</b>,
          renderCell: BalanceRenderer,
        },
        {
          headerName: "Amount",
          description: "Amount",
          field: "amount",
          type: "number",
          flex: 0.1,
          renderHeader: p => <b>{p.colDef.headerName}</b>,
          renderCell: AmountRenderer,
        },
      ] as GridColDef[],
    [onUpdateTransaction, categories]
  )

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Box
        sx={{
          flexGrow: 1,
          "& .datagrid-row-highlighted": {
            bgcolor: theme =>
              theme.palette.mode === "dark"
                ? theme.palette.success.dark
                : theme.palette.success.light,
          },
        }}
      >
        <DataGrid
          onSelectionModelChange={setMultiTransactionSelection}
          selectionModel={multiTransactionSelection}
          rows={transactions}
          columns={columns}
          getRowId={row => row.id || row.identifier}
          checkboxSelection
          autoPageSize
          pagination
          disableSelectionOnClick
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                {multiTransactionSelection.length > 0 && (
                  <Box sx={{ margin: "0 22% 0 auto" }}>
                    <CategorySelect onChange={onMultiCategoryChange} />
                  </Box>
                )}
              </GridToolbarContainer>
            ),
          }}
          getRowClassName={params =>
            transformedTransactions.includes(params.row.id) ? "datagrid-row-highlighted" : ""
          }
        />
      </Box>
    </Box>
  )
}

export default TransactionDatagrid
