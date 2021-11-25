import { Column } from "react-table"
import { Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import { TransactionWithCategories } from "../../types/types"

export const columns: Column<TransactionWithCategories>[] = [
  {
    Header: "Date",
    accessor: "issuedate",
    id: "issuedate",
    Cell: ({ value: v }) => dayjs(v).format("D. MMM YYYY"),
  },
  {
    Header: "Issuer",
    accessor: "issuer",
    id: "issuer",
  },
  {
    Header: "Type",
    accessor: "type",
    id: "type",
  },
  {
    Header: "Purpose",
    accessor: "purpose",
    id: "purpose",
  },
  {
    Header: "Categories",
    accessor: "categories",
    id: "categories",
    Cell: ({ value: v }) => v.map(cat => cat.name),
  },
  {
    Header: "Balance",
    accessor: "balance",
    id: "balance",
    Cell: ({ value: v }) => v?.toFixed(2),
  },
  {
    Header: "Amount",
    accessor: "amount",
    id: "amount",
    Cell: ({ value: v }) =>
      !v ? null : v < 0 ? (
        <Text weight="bold" color="red">
          {v.toFixed(2)}
        </Text>
      ) : (
        <Text weight="bold" color="lime">
          {v.toFixed(2)}
        </Text>
      ),
  },
  {
    Header: "Currency",
    accessor: "currency",
    id: "currency",
  },
]
