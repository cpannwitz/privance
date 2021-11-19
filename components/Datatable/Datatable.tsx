import RCTable from "rc-table"
import { ColumnsType } from "rc-table/lib/interface"
import { Table } from "@mantine/core"
import dayjs from "dayjs"
import { AccountChangeWithCategories } from "../../types/types"

// https://github.com/react-component/table

const columns: ColumnsType<AccountChangeWithCategories> = [
  {
    title: "Date",
    dataIndex: "issuedate",
    key: "issuedate",
    width: "10%",
    render: v => {
      return dayjs(v).format("D. MMM YYYY")
    },
  },
  {
    title: "Issuer",
    dataIndex: "issuer",
    key: "issuer",
    width: "20%",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: "5%",
  },
  {
    title: "Purpose",
    dataIndex: "purpose",
    key: "purpose",
    width: "40%",
  },
  {
    title: "Categories",
    dataIndex: "categories",
    key: "categories",
    width: "10%",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
    width: "5%",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: "5%",
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    width: "5%",
  },
]

interface DatatableProps {
  data: AccountChangeWithCategories[]
}

const Datatable = ({ data }: DatatableProps) => {
  console.log(`LOG |  ~ file: Datatable.tsx ~ line 66 ~ Datatable ~ data`, data)
  return <RCTable columns={columns} data={data} components={{ table: Table }} />
}

export default Datatable
