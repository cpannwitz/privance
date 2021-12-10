import { Button, VStack } from "@chakra-ui/react"
import { SubmitHandler } from "react-hook-form"

import FormWrapper from "../../FormWrapper/FormWrapper"
import OpenModal from "../../OpenModal/OpenModal"

import FieldPicker from "./FieldPicker"
import OperationPicker from "./OperationPicker"
import CategoriesPicker from "./CategoriesPicker"
import ValuePicker from "./ValuePicker"

import {
  // getInputType,
  schema,
} from "./FormUtils"
import { AutomationRule } from "../../../types/types"

interface AutomationEditProps {
  onSave: (automationRule: AutomationRule) => void
  onCancel: () => void
  formValue?: AutomationRule
}

const AutomationEdit = ({ onSave, onCancel, formValue }: AutomationEditProps) => {
  const onFormSubmit: SubmitHandler<AutomationRule> = data => {
    console.log(`LOG |  ~ file: AutomationEdit.tsx ~ line 23 ~ AutomationEdit ~ data`, data)
    onSave(data)
    // TODO: maybe unnötig?
    // const obj = {
    //   ...formValue,
    //   field: data.field,
    //   operation: data.operation,
    //   categories: data.categories,
    //   numberValue: getInputType(data.field) === "number" ? data.numberValue : undefined,
    //   stringValue: getInputType(data.field) === "text" ? data.stringValue : undefined,
    //   dateValue: getInputType(data.field) === "date" ? data.dateValue : undefined,
    //   // dateValue: data.dateValue,
    // }
    // console.log(`LOG |  ~ file: AutomationEdit.tsx ~ line 26 ~ AutomationEdit ~ obj`, obj)
    // onSave(obj)
  }

  const defaultValues = {
    field: formValue?.field ?? undefined,
    operation: formValue?.operation ?? undefined,
    categories: formValue?.categories ?? [],
    numberValue: formValue?.numberValue ?? undefined, // 0,
    stringValue: formValue?.stringValue ?? undefined, // "",
    dateValue: formValue?.dateValue || undefined, // "",
  }

  return (
    <OpenModal
      onCancel={onCancel}
      footerChildren={
        <>
          <Button variant="ghost" size="sm" mr={3} onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" colorScheme="blue" type="submit" form="AutomationRulesForm">
            Save
          </Button>
        </>
      }
    >
      <FormWrapper<AutomationRule>
        onSubmit={onFormSubmit}
        defaultValues={defaultValues}
        formId="AutomationRulesForm"
        schema={schema}
      >
        <VStack spacing={4}>
          <FieldPicker />
          <OperationPicker />
          <ValuePicker />
          <CategoriesPicker />
        </VStack>
      </FormWrapper>
    </OpenModal>
  )
}

export default AutomationEdit
