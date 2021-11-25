import { CellProps, Column } from "react-table"
import { Text, Tooltip } from "@chakra-ui/react"
import dayjs from "dayjs"
import { TransactionWithCategories } from "../../types/types"
import { PropsWithChildren } from "react"
import { Category } from ".prisma/client"

const DateRenderer = ({
  value,
}: PropsWithChildren<CellProps<TransactionWithCategories, Date | null>>) => (
  <Text whiteSpace="nowrap">{dayjs(value).format("D. MMM YYYY")}</Text>
)

const OneLineRenderer = ({ value }: { value: string | null }) => (
  <Tooltip hasArrow openDelay={200} placement="bottom" label={value}>
    <Text noOfLines={1}>{value}</Text>
  </Tooltip>
)

const CategoryRenderer = ({
  value,
}: PropsWithChildren<CellProps<TransactionWithCategories, Category[]>>) =>
  value.map(cat => cat.name)
const BalanceRenderer = ({
  value,
}: PropsWithChildren<CellProps<TransactionWithCategories, number | null>>) => {
  if (!value) {
    return null
  }
  if (value < 0) {
    return <Text color="coral">{value.toFixed(2)}</Text>
  }
  return <Text>{value.toFixed(2)}</Text>
}
const AmountRenderer = ({
  value,
}: PropsWithChildren<CellProps<TransactionWithCategories, number | null>>) => {
  if (!value) {
    return null
  }
  if (value < 0) {
    return (
      <Text fontWeight="bold" color="crimson">
        {value.toFixed(2)}
      </Text>
    )
  }
  return (
    <Text fontWeight="bold" color="limegreen">
      {value.toFixed(2)}
    </Text>
  )
}

export const columns: Column<TransactionWithCategories>[] = [
  {
    Header: "Date",
    accessor: "issuedate",
    id: "issuedate",
    Cell: DateRenderer,
  },
  {
    Header: "Issuer",
    accessor: "issuer",
    id: "issuer",
    Cell: OneLineRenderer,
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
    Cell: OneLineRenderer,
  },
  {
    Header: "Categories",
    accessor: "categories",
    id: "categories",
    Cell: CategoryRenderer,
  },
  {
    Header: "Balance",
    accessor: "balance",
    id: "balance",
    Cell: BalanceRenderer,
  },
  {
    Header: "Amount",
    accessor: "amount",
    id: "amount",
    Cell: AmountRenderer,
  },
  {
    Header: "Curr.",
    accessor: "currency",
    id: "currency",
  },
]
