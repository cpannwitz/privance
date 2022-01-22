import { Category } from ".prisma/client"
import { AutomationRuleWithCategory, TransactionWithCategory } from "../../types/types"
import TransactionTable from "../TransactionTable/TransactionTable"
import assignTransactionCategory from "./assignTransactionCategory"
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
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import PlayIcon from "remixicon-react/PlayLineIcon"
import CancelIcon from "remixicon-react/CloseCircleLineIcon"
import axios, { AxiosError } from "axios"

interface AutomationRuleApplyPreviewProps {
  automationRules: AutomationRuleWithCategory[]
  transactions: TransactionWithCategory[]
}

const AutomationRuleApplyPreview = ({
  automationRules,
  transactions,
}: AutomationRuleApplyPreviewProps) => {
  const [showTransformedOnly, setShowTransformedOnly] = useState(true)
  const toggleShowTransformedOnly = () => setShowTransformedOnly(state => !state)

  const [stateTransformedTransactions, setStateTransformedTransactions] = useState<
    TransactionWithCategory[]
  >([])
  const [stateAllTransactions, setStateAllTransactions] = useState<TransactionWithCategory[]>([])

  useEffect(() => {
    const {
      transformedTransactions,
      allTransactions,
      //  untouchedTransactions
    } = assignTransactionCategory(transactions, automationRules)

    setStateTransformedTransactions(transformedTransactions)
    setStateAllTransactions(allTransactions)
  }, [transactions, automationRules])

  const router = useRouter()
  function onCancel() {
    router.push(`/automationrules`)
  }

  const toast = useToast()
  function onApplyCategory() {
    const bodyData = stateTransformedTransactions.map(transaction => ({
      id: transaction.id,
      categoryConnect: transaction.category?.id,
    }))

    axios
      .post<{ data: TransactionWithCategory[] }>(
        "/api/transactions/updateTransactionsCategory",
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
          Applied following categories to <b>{stateTransformedTransactions.length}</b> transactions:
        </Text>
        {automationRules.map(ar => (
          <Tag
            key={ar.category.id}
            size="lg"
            variant="solid"
            bgColor={ar.category.color || undefined}
          >
            <TagLeftIcon boxSize={5} as={icons[ar.category.icon || "earth"]} />
            <TagLabel>{ar.category.name}</TagLabel>
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
          onClick={onApplyCategory}
          colorScheme="green"
        >
          Apply
        </Button>
      </HStack>

      <Divider my={6} />
      <Box w="100%" h="50%">
        <TransactionTable
          transactions={showTransformedOnly ? stateTransformedTransactions : stateAllTransactions}
          transformedTransactions={stateTransformedTransactions.map(t => t.id)}
        />
      </Box>
    </>
  )
}

export default AutomationRuleApplyPreview
