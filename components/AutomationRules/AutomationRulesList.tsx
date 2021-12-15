import { useState } from "react"
import axios, { AxiosError } from "axios"
import { useSWRConfig } from "swr"
import {
  useToast,
  HStack,
  VStack,
  IconButton,
  Icon,
  Box,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Tag,
  TagLeftIcon,
  TagLabel,
  Spacer,
} from "@chakra-ui/react"

import UploadIcon from "remixicon-react/Upload2LineIcon"
import PositiveIcon from "remixicon-react/CheckLineIcon"
import NegativeIcon from "remixicon-react/CloseLineIcon"

import { Prisma } from ".prisma/client"

import PlayIcon from "remixicon-react/PlayLineIcon"
import EditIcon from "remixicon-react/PencilLineIcon"
import AddIcon from "remixicon-react/AddLineIcon"
import DeleteIcon from "remixicon-react/DeleteBin6LineIcon"

import AutomationRulesEdit from "./AutomationRulesEdit/AutomationRulesEdit"
import { AutomationRuleWithCategories } from "../../types/types"
import { DataIsEmpty } from "./AutomationRulesListStates"
import { getValueType } from "./AutomationRulesEdit/FormUtils"
import { icons } from "../../shared/iconUtils"

import { useRouter } from "next/router"
import GeneralBadge from "../GeneralBadge/GeneralBadge"

interface AutomationListProps {
  data: AutomationRuleWithCategories[]
}

const AutomationList = ({ data }: AutomationListProps) => {
  const { mutate } = useSWRConfig()
  const toast = useToast()

  const [editedAutomationRule, setEditedAutomationRule] =
    useState<AutomationRuleWithCategories | null>(null)

  function onAddAutomationRule() {
    setEditedAutomationRule({} as AutomationRuleWithCategories)
  }

  function onEditAutomationRule(automationRule: AutomationRuleWithCategories) {
    setEditedAutomationRule(automationRule)
  }

  function onCloseAddEdit() {
    setEditedAutomationRule(null)
  }

  // TODO: badly needs better structure / external api requests
  function onSaveAddEdit(automationRule: AutomationRuleWithCategories) {
    if (!automationRule.id) {
      const { categories } = automationRule
      const automationRuleCreateInput: Prisma.AutomationRuleCreateInput = {
        ...automationRule,
        categories: { connect: categories.map(cat => ({ id: cat.id })) },
      }
      axios
        .post("/api/automationrules/addAutomationRule", automationRuleCreateInput)
        .then(() => {
          toast({
            title: `Added or updated your automation rule!`,
            status: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't add/update your automation rule: ${error.response.data.error}`,
              status: "error",
            })
          }
        })
        .finally(() => {
          mutate(`/api/automationrules/getAutomationRules`)
          setEditedAutomationRule(null)
        })
    } else {
      const { categories } = automationRule
      const automationRuleUpdateInput: Prisma.AutomationRuleUpdateInput &
        Prisma.AutomationRuleWhereUniqueInput = {
        ...automationRule,
        categories: { set: categories.map(cat => ({ id: cat.id })) },
      }
      axios
        .post("/api/automationrules/updateAutomationRule", automationRuleUpdateInput)
        .then(() => {
          toast({
            title: `Added or updated your automation rule!`,
            status: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't add/update your automation rule: ${error.response.data.error}`,
              status: "error",
            })
          }
        })
        .finally(() => {
          mutate(`/api/automationrules/getAutomationRules`)
          setEditedAutomationRule(null)
        })
    }
  }

  // TODO: badly needs external api requests
  function onDeleteAutomationRule(automationRule: AutomationRuleWithCategories) {
    if (automationRule?.id) {
      axios
        .delete("/api/automationrules/deleteAutomationRule", { params: { id: automationRule.id } })
        .then(() => {
          toast({
            title: `Deleted your Automation Rule!`,
            status: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't delete your automation rule: ${error.response.data.error}`,
              status: "error",
            })
          }
        })
        .finally(() => {
          mutate(`/api/automationrules/getAutomationRules`)
        })
    }
  }

  function onToggleAutomationRuleOnUploadRun(automationRule: AutomationRuleWithCategories) {
    if (automationRule?.id) {
      const { categories } = automationRule
      const automationRuleUpdateInput: Prisma.AutomationRuleUpdateInput &
        Prisma.AutomationRuleWhereUniqueInput = {
        ...automationRule,
        categories: { set: categories.map(cat => ({ id: cat.id })) },
        activeOnUpload: !automationRule.activeOnUpload,
      }
      axios
        .post("/api/automationrules/updateAutomationRule", automationRuleUpdateInput)
        .then(() => {
          toast({
            title: `Updated your automation rule!`,
            status: "success",
          })
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            toast({
              title: `Couldn't update your automation rule: ${error.response.data.error}`,
              status: "error",
            })
          }
        })
        .finally(() => {
          mutate(`/api/automationrules/getAutomationRules`)
          setEditedAutomationRule(null)
        })
    }
  }

  const router = useRouter()
  function onRunAutomationRule(automationRule: AutomationRuleWithCategories) {
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
      <Box w="100%" mb={5}>
        <Button
          isFullWidth
          size="lg"
          colorScheme="blue"
          leftIcon={<Icon as={AddIcon} boxSize={7} />}
          onClick={onAddAutomationRule}
        >
          Add Automation Rule
        </Button>
      </Box>
      {data.length < 1 ? (
        <DataIsEmpty />
      ) : (
        <VStack spacing={4}>
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
        </VStack>
      )}
    </>
  )
}

export default AutomationList

interface AutomationRuleListItemProps {
  onRun: (automationRule: AutomationRuleWithCategories) => void
  onEdit: (automationRule: AutomationRuleWithCategories) => void
  onDelete: (automationRule: AutomationRuleWithCategories) => void
  onToggleOnUploadRun: (automationRule: AutomationRuleWithCategories) => void
  automationRule: AutomationRuleWithCategories
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
    <HStack w="100%" p={3} shadow="md" borderWidth="1px" align="center" borderRadius="lg">
      <StatGroup minW="75%">
        <Stat>
          <StatLabel>If the</StatLabel>
          <StatNumber>{automationRule.field}</StatNumber>
          <StatHelpText>of a transaction</StatHelpText>
        </Stat>

        {StatBlocks[getValueType(automationRule.field)](automationRule)}

        <Stat>
          <StatLabel>then</StatLabel>
          {automationRule.categories.map(cat => (
            <Tag key={cat.id} size="lg" variant="solid" bgColor={cat.color || undefined}>
              <TagLeftIcon boxSize={5} as={icons[cat.icon || "earth"]} />
              <TagLabel>{cat.name}</TagLabel>
            </Tag>
          ))}
          <StatHelpText>will be assigned.</StatHelpText>
        </Stat>
      </StatGroup>
      <Spacer />

      <IconButton
        variant="ghost"
        isRound
        aria-label="toggle run on upload"
        icon={
          <>
            <Icon as={UploadIcon} color="gray.300" boxSize={5} />
            <GeneralBadge bg={automationRule.activeOnUpload ? "green.500" : "red.500"}>
              <Icon
                as={automationRule.activeOnUpload ? PositiveIcon : NegativeIcon}
                boxSize="0.7em"
                color="white"
              />
            </GeneralBadge>
          </>
        }
        onClick={onToggleAutomationRuleRunOnUpload}
      />
      <IconButton
        variant="ghost"
        isRound
        aria-label="delete automation rule"
        icon={<Icon as={DeleteIcon} color="gray.300" boxSize={5} />}
        onClick={onDeleteAutomationRule}
      />
      <IconButton
        variant="ghost"
        isRound
        aria-label="edit automation rule"
        icon={<Icon as={EditIcon} color="gray.300" boxSize={5} />}
        onClick={onEditAutomationRule}
      />
      <IconButton
        variant="ghost"
        isRound
        aria-label="run automation rule"
        icon={<Icon as={PlayIcon} color="gray.300" boxSize={5} />}
        onClick={onRunAutomationRule}
      />
    </HStack>
  )
}

const StringValueBlock = (automationRule: AutomationRuleWithCategories) => {
  return (
    <Stat>
      <StatLabel>{automationRule.operation}</StatLabel>
      <StatNumber>{automationRule.stringValue}</StatNumber>
      <StatHelpText>as a value</StatHelpText>
    </Stat>
  )
}
const NumberValueBlock = (automationRule: AutomationRuleWithCategories) => {
  return (
    <Stat>
      <StatLabel>has {automationRule.operation}</StatLabel>
      <StatNumber>{automationRule.numberValue}</StatNumber>
      <StatHelpText>as a value</StatHelpText>
    </Stat>
  )
}
const DateValueBlock = (automationRule: AutomationRuleWithCategories) => {
  return (
    <Stat>
      <StatLabel>is {automationRule.operation}</StatLabel>
      <StatNumber>{new Date(automationRule.dateValue || "").toLocaleDateString()}</StatNumber>
      <StatHelpText>as a value</StatHelpText>
    </Stat>
  )
}

const StatBlocks = {
  stringValue: StringValueBlock,
  numberValue: NumberValueBlock,
  dateValue: DateValueBlock,
}
