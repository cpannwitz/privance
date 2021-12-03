import { Column } from "react-table"

import { TransactionWithCategories } from "../../types/types"
import { Category } from ".prisma/client"
import CategoryRenderer from "./renderer/CategoryRenderer"
import TextRenderer from "./renderer/TextRenderer"
import DateRenderer from "./renderer/DateRenderer"
import NumberRenderer from "./renderer/NumberRenderer"

interface GetColumnsProps {
  categories: Category[]
}
export const getColumns = ({
  categories,
}: GetColumnsProps): Column<TransactionWithCategories>[] => {
  return [
    {
      Header: "Date",
      accessor: "issuedate",
      id: "issuedate",
      Cell: DateRenderer,
      width: "0.0000000001%", // collapse to min-width -> https://github.com/tannerlinsley/react-table/issues/1639
    },
    {
      Header: "Issuer",
      accessor: "issuer",
      id: "issuer",
      Cell: TextRenderer,
      width: "3%",
    },
    {
      Header: "Type",
      accessor: "type",
      id: "type",
      width: "0.0000000001%", // collapse to min-width
    },
    {
      Header: "Purpose",
      accessor: "purpose",
      id: "purpose",
      Cell: TextRenderer,
      width: "6%",
    },
    {
      Header: "Categories",
      accessor: "categories",
      id: "categories",
      Cell: p => <CategoryRenderer {...p} categories={categories} />,
      width: "3%",
    },
    {
      Header: "Balance",
      accessor: "balance",
      id: "balance",
      Cell: p => <NumberRenderer {...p} variant="balance" />,
      width: "0.0000000001%", // collapse to min-width
    },
    {
      Header: "Amount",
      accessor: "amount",
      id: "amount",
      Cell: p => <NumberRenderer {...p} variant="amount" />,
      width: "0.0000000001%", // collapse to min-width
    },
    {
      Header: "Curr.",
      accessor: "currency",
      id: "currency",
      width: "0.0000000001%", // collapse to min-width
    },
  ]
}
