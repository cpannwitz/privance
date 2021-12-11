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
} from "@chakra-ui/react"

import { Prisma } from ".prisma/client"

import EditIcon from "remixicon-react/PencilLineIcon"
import AddIcon from "remixicon-react/AddLineIcon"
import DeleteIcon from "remixicon-react/DeleteBin6LineIcon"

import AutomationRulesEdit from "./AutomationRulesEdit/AutomationRulesEdit"
import { AutomationRuleWithCategories } from "../../types/types"
import { DataIsEmpty } from "./AutomationRulesListStates"
import { getValueType } from "./AutomationRulesEdit/FormUtils"
import { icons } from "../../shared/iconUtils"

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
        categories: { connect: categories.map(cat => ({ id: cat.id })) },
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
              onEdit={onEditAutomationRule}
              onDelete={onDeleteAutomationRule}
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
  onEdit: (automationRule: AutomationRuleWithCategories) => void
  onDelete: (automationRule: AutomationRuleWithCategories) => void
  automationRule: AutomationRuleWithCategories
}

// TODO: i18n, plus better labels, better text structure (for string, number, date...)
const AutomationRuleListItem = ({
  onEdit,
  onDelete,
  automationRule,
}: AutomationRuleListItemProps) => {
  function onEditAutomationRule() {
    onEdit(automationRule)
  }
  function onDeleteAutomationRule() {
    onDelete(automationRule)
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

      <IconButton
        variant="ghost"
        isRound
        aria-label="edit category"
        icon={<Icon as={DeleteIcon} color="gray.300" boxSize={5} />}
        onClick={onDeleteAutomationRule}
      />
      <IconButton
        variant="ghost"
        isRound
        aria-label="edit category"
        icon={<Icon as={EditIcon} color="gray.300" boxSize={5} />}
        onClick={onEditAutomationRule}
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
