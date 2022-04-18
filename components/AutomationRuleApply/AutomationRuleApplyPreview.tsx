import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/router"

import { AutomationRuleWithCategory, TransactionWithCategory } from "../../types/types"
import TransactionDatagrid from "../TransactionDatagrid/TransactionDatagrid"
import assignTransactionCategory from "./assignTransactionCategory"

import { icons, placeholderIcon } from "../../shared/iconUtils"

import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Switch from "@mui/material/Switch"
import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"

import { useSnackbar } from "notistack"

import PlayIcon from "@mui/icons-material/PlayArrowOutlined"
import CancelIcon from "@mui/icons-material/CancelOutlined"

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

  const { enqueueSnackbar } = useSnackbar()
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
        enqueueSnackbar(`Updated your transactions!`, {
          variant: "success",
        })
        router.push(`/overview`)
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          enqueueSnackbar(`Couldn't update your transactions: ${error.response.data.error}`, {
            variant: "error",
          })
        }
      })
  }

  return (
    <>
      <Alert severity="info" sx={{ mb: 5 }}>
        <Box sx={{ mr: 1, display: "inline" }}>
          Applied following categories to <b>{stateTransformedTransactions.length}</b> transactions:
        </Box>
        {automationRules.map(automationRule => (
          <Chip
            key={automationRule.id}
            label={automationRule.category.name}
            icon={
              automationRule.category.icon ? icons[automationRule.category.icon] : placeholderIcon
            }
            sx={{
              backgroundColor: automationRule.category.color || undefined,
              color: "white",
              "& .MuiChip-icon": { color: "white" },
            }}
          />
        ))}
      </Alert>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <FormGroup>
          <FormControlLabel
            label="Show affected only"
            control={<Switch checked={showTransformedOnly} onChange={toggleShowTransformedOnly} />}
          />
        </FormGroup>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > *": { ml: 2 },
          }}
        >
          <Button startIcon={<CancelIcon />} onClick={onCancel} variant="text" color="error">
            Cancel
          </Button>
          <Button
            startIcon={<PlayIcon />}
            onClick={onApplyCategory}
            color="primary"
            variant="contained"
          >
            Apply
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 5 }} />
      <Box sx={{ width: "100%", height: "50%" }}>
        <TransactionDatagrid
          transactions={showTransformedOnly ? stateTransformedTransactions : stateAllTransactions}
          transformedTransactions={stateTransformedTransactions.map(t => t.id)}
        />
      </Box>
    </>
  )
}

export default AutomationRuleApplyPreview
