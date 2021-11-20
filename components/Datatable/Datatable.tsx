import RCTable from "rc-table"
import { ColumnsType } from "rc-table/lib/interface"
import { Loader, Table, Text, Center, Group, Button } from "@mantine/core"
import dayjs from "dayjs"
import { TransactionWithCategories } from "../../types/types"
import useGetTransactions from "../hooks/useGetTransactions"
import { useCallback } from "react"
import { useRouter } from "next/router"

// https://github.com/react-component/table

// TODO: dark mode styles are currently missing

const columns: ColumnsType<TransactionWithCategories> = [
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
    render: (v: TransactionWithCategories["categories"]) => v.map(cat => cat.name),
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
    render: (v: TransactionWithCategories["amount"]) =>
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

interface DatatableProps {}

const Datatable = ({}: DatatableProps) => {
  const { data, isError, isLoading, mutate } = useGetTransactions()

  const retry = useCallback(() => mutate(), [mutate])

  return (
    <RCTable<TransactionWithCategories>
      columns={columns}
      data={data}
      rowKey={r => r.id}
      components={{ table: Table }}
      emptyText={
        isLoading ? (
          <DataIsLoading />
        ) : isError ? (
          <DataIsError retry={retry} />
        ) : !data || data.length === 0 ? (
          <DataIsEmpty />
        ) : undefined
      }
    />
  )
}

export default Datatable

const DataIsLoading = () => (
  <Center style={{ height: "12rem" }}>
    <Loader color="orange" size="lg" variant="bars" />
  </Center>
)

const DataIsEmpty = () => {
  const router = useRouter()
  const linkToUpload = useCallback(() => router.push(`/upload`), [router])
  return (
    <Center style={{ height: "12rem" }}>
      <Group direction="column" position="center">
        <Text color="gray">You currently have no data. Please add some first.</Text>
        <Button variant="light" color="violet" compact onClick={linkToUpload}>
          Add some data
        </Button>
      </Group>
    </Center>
  )
}

const DataIsError = ({ retry }: any) => (
  <Center style={{ height: "12rem" }}>
    <Group direction="column" position="center">
      <Text color="gray">Couldn&apos;t fetch your data. Please retry.</Text>
      <Button variant="light" color="violet" compact onClick={retry}>
        Reload
      </Button>
    </Group>
  </Center>
)
