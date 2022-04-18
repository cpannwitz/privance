import { useMemo } from "react"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
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

interface TransactionDatagridProps {
  transactions: TransactionWithCategory[]
  transformedTransactions?: number[]
  onUpdateTransaction?: (transcation: TransactionWithCategory) => void
}

const DEFAULTTRANSFORMEDTRANSACTIONS: number[] = []

const TransactionDatagrid = ({
  transactions,
  transformedTransactions = DEFAULTTRANSFORMEDTRANSACTIONS,
  onUpdateTransaction,
}: TransactionDatagridProps) => {
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
          filterable: false,
          flex: 0.1,
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
    [onUpdateTransaction]
  )

  return (
    <>
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
            rows={transactions}
            columns={columns}
            getRowId={row => row.id || row.identifier}
            checkboxSelection
            autoPageSize
            pagination
            disableSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
            getRowClassName={params =>
              transformedTransactions.includes(params.row.id) ? "datagrid-row-highlighted" : ""
            }
          />
        </Box>
      </Box>
    </>
  )
}

export default TransactionDatagrid
