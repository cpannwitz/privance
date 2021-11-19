import RCTable from "rc-table"
import { ColumnsType } from "rc-table/lib/interface"
import { Table, Text } from "@mantine/core"
import dayjs from "dayjs"
import { AccountChangeWithCategories } from "../../types/types"

// https://github.com/react-component/table

const columns: ColumnsType<AccountChangeWithCategories> = [
  {
    title: "Date",
    dataIndex: "issuedate",
    key: "issuedate",
    width: "10%",
    render: v => dayjs(v).format("D. MMM YYYY"),
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
    render: (v: AccountChangeWithCategories["categories"]) => v.map(cat => cat.name),
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
    align: "right",
    render: (v: AccountChangeWithCategories["amount"]) =>
      !v ? null : v < 0 ? (
        <Text weight="bold" color="red">
          {v}
        </Text>
      ) : (
        <Text weight="bold" color="lime">
          {v}
        </Text>
      ),
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    width: "5%",
    align: "left",
  },
]

interface DatatableProps {
  data: AccountChangeWithCategories[]
}

const Datatable = ({ data }: DatatableProps) => {
  return (
    <RCTable<AccountChangeWithCategories>
      columns={columns}
      data={data}
      rowKey={r => r.id}
      components={{ table: Table }}
    />
  )
}

export default Datatable
