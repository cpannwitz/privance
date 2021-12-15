import { Category } from ".prisma/client"
import { AutomationRuleWithCategories, TransactionWithCategories } from "../../types/types"
import TransactionTable from "../TransactionTable/TransactionTable"
import assignTransactionCategories from "./assignTransactionCategories"
import {
  Box,
  HStack,
  Spacer,
  Divider,
  Text,
  Tag,
  TagLeftIcon,
  TagLabel,
  Button,
  FormLabel,
  Switch,
  FormControl,
  Alert,
  AlertIcon,
  Icon,
  useToast,
} from "@chakra-ui/react"
import { icons } from "../../shared/iconUtils"
import { useMemo, useState } from "react"
import { useRouter } from "next/router"

import PlayIcon from "remixicon-react/PlayLineIcon"
import CancelIcon from "remixicon-react/CloseCircleLineIcon"
import axios, { AxiosError } from "axios"

interface AutomationRuleApplyPreviewProps {
  automationRules: AutomationRuleWithCategories[]
  transactions: TransactionWithCategories[]
  categories: Category[]
}

const AutomationRuleApplyPreview = ({
  automationRules,
  transactions,
  categories,
}: AutomationRuleApplyPreviewProps) => {
  const {
    transformedTransactions,
    allTransactions,
    //  untouchedTransactions
  } = useMemo(
    () => assignTransactionCategories(transactions, automationRules),
    [transactions, automationRules]
  )

  const [showTransformedOnly, setShowTransformedOnly] = useState(false)
  const toggleShowTransformedOnly = () => setShowTransformedOnly(state => !state)

  const router = useRouter()
  function onCancel() {
    router.push(`/automationrules`)
  }

  const toast = useToast()
  async function onApplyCategories() {
    const bodyData = transformedTransactions.map(transaction => ({
      id: transaction.id,
      categoriesConnect: transaction.categories.map(cat => cat.id),
    }))

    axios
      .post<{ data: TransactionWithCategories[] }>(
        "/api/transactions/updateTransactionsCategories",
        bodyData
      )
      .then(() => {
        toast({
          title: `Updated your transactions!`,
          status: "success",
        })
        router.push(`/overview`)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          toast({
            title: `Couldn't update your transactions: ${error.response.data.error}`,
            status: "error",
          })
        }
      })
  }

  return (
    <>
      <Alert status="info" mb={5}>
        <AlertIcon />
        <Text mr={3}>
          Applied following categories to <b>{transformedTransactions.length}</b> transactions:
        </Text>
        {automationRules
          .flatMap(r => r.categories)
          .map(cat => (
            <Tag key={cat.id} size="lg" variant="solid" bgColor={cat.color || undefined}>
              <TagLeftIcon boxSize={5} as={icons[cat.icon || "earth"]} />
              <TagLabel>{cat.name}</TagLabel>
            </Tag>
          ))}
      </Alert>

      <HStack>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Show affected only
          </FormLabel>
          <Switch
            id="email-alerts"
            colorScheme="green"
            isChecked={showTransformedOnly}
            onChange={toggleShowTransformedOnly}
          />
        </FormControl>

        <Spacer />

        <Button
          leftIcon={<Icon as={CancelIcon} boxSize={5} />}
          onClick={onCancel}
          variant="ghost"
          colorScheme="red"
        >
          Cancel
        </Button>
        <Button
          leftIcon={<Icon as={PlayIcon} boxSize={5} />}
          onClick={onApplyCategories}
          colorScheme="green"
        >
          Apply
        </Button>
      </HStack>

      <Divider my={6} />
      <Box w="100%" h="50%">
        <TransactionTable
          categories={categories}
          transactions={showTransformedOnly ? transformedTransactions : allTransactions}
          transformedTransactions={transformedTransactions.map(t => t.id)}
        />
      </Box>
    </>
  )
}

export default AutomationRuleApplyPreview
