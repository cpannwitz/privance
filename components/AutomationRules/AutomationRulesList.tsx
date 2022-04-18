import { useState } from "react"
import axios, { AxiosError } from "axios"

import { Prisma } from ".prisma/client"

import { useSnackbar } from "notistack"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Chip from "@mui/material/Chip"
import Badge from "@mui/material/Badge"

import UploadIcon from "@mui/icons-material/FileUploadOutlined"
import NegativeIcon from "@mui/icons-material/CancelOutlined"
import PositiveIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import PlayIcon from "@mui/icons-material/PlayArrowOutlined"
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import EditIcon from "@mui/icons-material/EditOutlined"
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined"

import Stat from "../Stat/Stat"

import AutomationRulesEdit from "./AutomationRulesEdit/AutomationRulesEdit"
import { AutomationRuleWithCategory } from "../../types/types"
import DataIsEmpty from "../DataStates/DataIsEmpty"
import { getValueType } from "./AutomationRulesEdit/FormUtils"
import { icons, placeholderIcon } from "../../shared/iconUtils"

import { useRouter } from "next/router"
import useGetAutomationRules from "../hooks/useGetAutomationRules"

interface AutomationListProps {
  data: AutomationRuleWithCategory[]
}

const AutomationList = ({ data }: AutomationListProps) => {
  const { mutate: mutateAutomationRules } = useGetAutomationRules()
  const { enqueueSnackbar } = useSnackbar()

  const [editedAutomationRule, setEditedAutomationRule] =
    useState<AutomationRuleWithCategory | null>(null)

  function onAddAutomationRule() {
    setEditedAutomationRule({} as AutomationRuleWithCategory)
  }

  function onEditAutomationRule(automationRule: AutomationRuleWithCategory) {
    setEditedAutomationRule(automationRule)
  }

  function onCloseAddEdit() {
    setEditedAutomationRule(null)
  }

  // TODO: badly needs better structure / external api requests
  function onSaveAddEdit(automationRule: AutomationRuleWithCategory) {
    if (!automationRule.id) {
      const automationRuleCreateInput: Prisma.AutomationRuleCreateInput = {
        ...automationRule,
        category: { connect: { id: automationRule.category.id } },
      }
      axios
        .post("/api/automationrules/addAutomationRule", automationRuleCreateInput)
        .then(() => {
          enqueueSnackbar(`Added or updated your automation rule!`, {
            variant: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            enqueueSnackbar(
              `Couldn't add/update your automation rule: ${error.response.data.error}`,
              {
                variant: "error",
              }
            )
          }
        })
        .finally(() => {
          mutateAutomationRules()
          setEditedAutomationRule(null)
        })
    } else {
      const automationRuleUpdateInput: Prisma.AutomationRuleUpdateInput &
        Prisma.AutomationRuleWhereUniqueInput = {
        ...automationRule,
        category: { connect: { id: automationRule.category.id } },
      }
      axios
        .post("/api/automationrules/updateAutomationRule", automationRuleUpdateInput)
        .then(() => {
          enqueueSnackbar(`Added or updated your automation rule!`, {
            variant: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            enqueueSnackbar(
              `Couldn't add/update your automation rule: ${error.response.data.error}`,
              {
                variant: "error",
              }
            )
          }
        })
        .finally(() => {
          mutateAutomationRules()
          setEditedAutomationRule(null)
        })
    }
  }

  // TODO: badly needs external api requests
  function onDeleteAutomationRule(automationRule: AutomationRuleWithCategory) {
    if (automationRule?.id) {
      axios
        .delete("/api/automationrules/deleteAutomationRule", { params: { id: automationRule.id } })
        .then(() => {
          enqueueSnackbar(`Deleted your Automation Rule!`, {
            variant: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            enqueueSnackbar(`Couldn't delete your automation rule: ${error.response.data.error}`, {
              variant: "error",
            })
          }
        })
        .finally(() => {
          mutateAutomationRules()
        })
    }
  }

  function onToggleAutomationRuleOnUploadRun(automationRule: AutomationRuleWithCategory) {
    if (automationRule?.id) {
      // TODO: better removal of unused property
      const { categoryId, ...automationRuleSafe } = automationRule
      const automationRuleUpdateInput: Prisma.AutomationRuleUpdateInput &
        Prisma.AutomationRuleWhereUniqueInput = {
        ...automationRuleSafe,
        category: {
          connect: { id: automationRule.category.id },
        },
        activeOnUpload: !automationRule.activeOnUpload,
      }
      axios
        .post("/api/automationrules/updateAutomationRule", automationRuleUpdateInput)
        .then(() => {
          enqueueSnackbar(`Updated your automation rule!`, {
            variant: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            enqueueSnackbar(`Couldn't update your automation rule: ${error.response.data.error}`, {
              variant: "error",
            })
          }
        })
        .finally(() => {
          mutateAutomationRules()
          setEditedAutomationRule(null)
        })
    }
  }

  const router = useRouter()
  function onRunAutomationRule(automationRule: AutomationRuleWithCategory) {
    router.push({
      pathname: `/automationruleapply`,
      query: {
        rules: [automationRule.id],
      },
    })
  }

  return (
    <>
      {editedAutomationRule && (
        <AutomationRulesEdit
          onSave={onSaveAddEdit}
          onCancel={onCloseAddEdit}
          formValue={editedAutomationRule}
        />
      )}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddAutomationRule}
        >
          Add Automation Rule
        </Button>
      </Box>
      {data.length < 1 ? (
        <DataIsEmpty />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", "& > *": { mb: 3 } }}>
          {data.map(automationRule => (
            <AutomationRuleListItem
              key={automationRule.id}
              onRun={onRunAutomationRule}
              onEdit={onEditAutomationRule}
              onDelete={onDeleteAutomationRule}
              onToggleOnUploadRun={onToggleAutomationRuleOnUploadRun}
              automationRule={automationRule}
            />
          ))}
        </Box>
      )}
    </>
  )
}

export default AutomationList

interface AutomationRuleListItemProps {
  onRun: (automationRule: AutomationRuleWithCategory) => void
  onEdit: (automationRule: AutomationRuleWithCategory) => void
  onDelete: (automationRule: AutomationRuleWithCategory) => void
  onToggleOnUploadRun: (automationRule: AutomationRuleWithCategory) => void
  automationRule: AutomationRuleWithCategory
}

// TODO: i18n, plus better labels, better text structure (for string, number, date...)
const AutomationRuleListItem = ({
  onRun,
  onEdit,
  onDelete,
  onToggleOnUploadRun,
  automationRule,
}: AutomationRuleListItemProps) => {
  function onEditAutomationRule() {
    onEdit(automationRule)
  }
  function onDeleteAutomationRule() {
    onDelete(automationRule)
  }
  function onRunAutomationRule() {
    onRun(automationRule)
  }
  function onToggleAutomationRuleRunOnUpload() {
    onToggleOnUploadRun(automationRule)
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        boxShadow: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 2,
        "& > *": { mr: 2 },
      }}
    >
      <Stat heading="If the" label={automationRule.field} sublabel="of a transaction" />

      {StatBlocks[getValueType(automationRule.field)](automationRule)}

      <Stat
        heading="then"
        label={
          <Chip
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
        }
        sublabel="will be assigned."
      />

      <IconButton
        aria-label="toggle run on upload"
        onClick={onToggleAutomationRuleRunOnUpload}
        sx={{ color: "grey.400" }}
      >
        <Badge
          badgeContent={
            automationRule.activeOnUpload ? (
              <PositiveIcon color="success" sx={{ width: "16px", height: "16px" }} />
            ) : (
              <NegativeIcon color="error" sx={{ width: "16px", height: "16px" }} />
            )
          }
        >
          <UploadIcon />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="delete automation rule"
        onClick={onDeleteAutomationRule}
        sx={{ color: "grey.400" }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        aria-label="edit automation rule"
        onClick={onEditAutomationRule}
        sx={{ color: "grey.400" }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="run automation rule"
        onClick={onRunAutomationRule}
        sx={{ color: "grey.400" }}
      >
        <PlayIcon />
      </IconButton>
    </Box>
  )
}

const StringValueBlock = (automationRule: AutomationRuleWithCategory) => {
  return (
    <Stat
      heading={automationRule.operation}
      label={automationRule.stringValue ?? ""}
      sublabel="as a value"
    />
  )
}
const NumberValueBlock = (automationRule: AutomationRuleWithCategory) => {
  return (
    <Stat
      heading={automationRule.operation}
      label={automationRule.numberValue ?? ""}
      sublabel="as a value"
    />
  )
}
const DateValueBlock = (automationRule: AutomationRuleWithCategory) => {
  return (
    <Stat
      heading={automationRule.operation}
      label={new Date(automationRule.dateValue || "").toLocaleDateString()}
      sublabel="as a value"
    />
  )
}

const StatBlocks = {
  stringValue: StringValueBlock,
  numberValue: NumberValueBlock,
  dateValue: DateValueBlock,
}
