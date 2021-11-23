import RCTable from "rc-table"
import { ColumnsType } from "rc-table/lib/interface"
import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react"
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
    render: (v: TransactionWithCategories["balance"]) => v?.toFixed(2),
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
          {v.toFixed(2)}
        </Text>
      ) : (
        <Text weight="bold" color="lime">
          {v.toFixed(2)}
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
      components={{
        table: Table,
        body: { wrapper: Tbody, cell: Td, row: Tr },
        header: { wrapper: Thead, cell: Th, row: Tr },
      }}
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
  <Center h="12rem">
    <Spinner thickness="4px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Center>
)

const DataIsEmpty = () => {
  const router = useRouter()
  const linkToUpload = useCallback(() => router.push(`/upload`), [router])
  return (
    <Center h="12rem">
      <VStack>
        <Text color="gray.600">You currently have no data. Please add some first.</Text>
        <Button variant="outline" colorScheme="violet" size="sm" onClick={linkToUpload}>
          Add some data
        </Button>
      </VStack>
    </Center>
  )
}

const DataIsError = ({ retry }: any) => (
  <Center h="12rem">
    <VStack>
      <Text color="gray">Couldn&apos;t fetch your data. Please retry.</Text>
      <Button variant="outline" colorScheme="violet" size="sm" onClick={retry}>
        Reload
      </Button>
    </VStack>
  </Center>
)
