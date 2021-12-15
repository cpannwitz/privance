import { Column } from "react-table"

import { TransactionWithCategories } from "../../types/types"
import { Category } from ".prisma/client"
import InteractiveCategoryRenderer from "./columnrenderer/InteractiveCategoryRenderer"
import DisplayTextRenderer from "./columnrenderer/DisplayTextRenderer"
import DisplayDateRenderer from "./columnrenderer/DisplayDateRenderer"
import DisplayNumberRenderer from "./columnrenderer/DisplayNumberRenderer"

interface GetPreviewColumnsProps {
  categories: Category[]
  onSelectCategories?: (transaction: TransactionWithCategories) => void
}
const getPreviewColumns = ({
  categories,
  onSelectCategories = () => {},
}: GetPreviewColumnsProps): Column<TransactionWithCategories>[] => {
  return [
    {
      Header: "Date",
      accessor: "issuedate",
      id: "issuedate",
      Cell: DisplayDateRenderer,
      width: "10%",
      // width: 0.1,
      // width: "0.0000000001%", // collapse to min-width -> https://github.com/tannerlinsley/react-table/issues/1639
    },
    {
      Header: "Issuer",
      accessor: "issuer",
      id: "issuer",
      Cell: DisplayTextRenderer,
      width: "20%",
      // width: 3,
      // width: "3%",
    },
    {
      Header: "Type",
      accessor: "type",
      id: "type",
      width: "10%",
      // width: 0.1,
      // width: "0.0000000001%", // collapse to min-width
    },
    {
      Header: "Purpose",
      accessor: "purpose",
      id: "purpose",
      Cell: DisplayTextRenderer,
      width: "25%",
      // width: 6,
      // width: "6%",
    },
    {
      Header: "Categories",
      accessor: "categories",
      id: "categories",
      Cell: p => (
        <InteractiveCategoryRenderer
          {...p}
          categories={categories}
          onSelectCategories={onSelectCategories}
        />
      ),
      width: "10%",
      // width: 3,
      // width: "3%",
    },
    {
      Header: "Balance",
      accessor: "balance",
      id: "balance",
      Cell: p => <DisplayNumberRenderer {...p} variant="balance" />,
      width: "10%",
      // width: 0.1,
      // width: "0.0000000001%", // collapse to min-width
    },
    {
      Header: "Amount",
      accessor: "amount",
      id: "amount",
      Cell: p => <DisplayNumberRenderer {...p} variant="amount" />,
      width: "10%",
      // width: 0.1,
      // width: "0.0000000001%", // collapse to min-width
    },
    {
      Header: "Curr.",
      accessor: "currency",
      id: "currency",
      width: "5%",
      // width: 0.1,
      // width: "0.0000000001%", // collapse to min-width
    },
  ]
}

export default getPreviewColumns