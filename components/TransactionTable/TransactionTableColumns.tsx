import { Column } from "react-table"

import { TransactionWithCategory } from "../../types/types"
import { Category } from ".prisma/client"
import InteractiveCategoryRenderer from "./columnrenderer/InteractiveCategoryRenderer"
import DisplayTextRenderer from "./columnrenderer/DisplayTextRenderer"
import DisplayDateRenderer from "./columnrenderer/DisplayDateRenderer"
import DisplayNumberRenderer from "./columnrenderer/DisplayNumberRenderer"

interface GetPreviewColumnsProps {
  categories: Category[]
  onSelectCategory?: (transaction: TransactionWithCategory) => void
}
const getPreviewColumns = ({
  categories,
  onSelectCategory = () => {},
}: GetPreviewColumnsProps): Column<TransactionWithCategory>[] => {
  return [
    {
      Header: "Date",
      accessor: "issuedate",
      id: "issuedate",
      Cell: DisplayDateRenderer,
      width: "15%",
    },
    {
      Header: "Issuer",
      accessor: "issuer",
      id: "issuer",
      Cell: DisplayTextRenderer,
      width: "15%",
    },
    {
      Header: "Type",
      accessor: "type",
      id: "type",
      Cell: DisplayTextRenderer,
      width: "10%",
    },
    {
      Header: "Purpose",
      accessor: "purpose",
      id: "purpose",
      Cell: DisplayTextRenderer,
      width: "30%",
    },
    {
      Header: "Categ.",
      accessor: "category",
      id: "category",
      Cell: p => (
        <InteractiveCategoryRenderer
          {...p}
          categories={categories}
          onSelectCategory={onSelectCategory}
        />
      ),
      width: "10%",
    },
    {
      Header: "Balance",
      accessor: "balance",
      id: "balance",
      Cell: p => <DisplayNumberRenderer {...p} variant="balance" />,
      width: "10%",
    },
    {
      Header: "Amount",
      accessor: "amount",
      id: "amount",
      Cell: p => <DisplayNumberRenderer {...p} variant="amount" />,
      width: "10%",
    },
  ]
}

export default getPreviewColumns
