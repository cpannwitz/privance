import * as yup from "yup"
import { AutomationRuleWithCategories, TAutomationRuleField } from "../../../types/types"

export const parseDateToString = (date?: Date | null) => {
  if (!date) return undefined
  return `${date.getFullYear().toString().padStart(2, "0")}-${date
    .getMonth()
    .toString()
    .padStart(2, "0")}-${date.getDay().toString().padStart(2, "0")}`
}
export const parseStringToDate = (dateString: string) => new Date(dateString)

export const schema = yup
  .object({
    field: yup.string().required("Please select the desired field to operate on."),
    operation: yup.string().required("Please select the desired operation."),
    categories: yup.array().min(1, "Please select atleast 1 category."),
    stringValue: yup.string().when("field", {
      is: (fieldValue: TAutomationRuleField) => getFieldType(fieldValue) === "string",
      then: yup.string().required("Please fill in an appropiate value."),
    }),
    numberValue: yup.number().when("field", {
      is: (fieldValue: TAutomationRuleField) => getFieldType(fieldValue) === "number",
      then: yup.number().required("Please fill in an appropiate value."),
    }),
    dateValue: yup.date().when("field", {
      is: (fieldValue: TAutomationRuleField) => getFieldType(fieldValue) === "date",
      then: yup.date().required("Please fill in an appropiate value."),
    }),
  })
  .required()

export function getValueType(field: TAutomationRuleField) {
  switch (field) {
    case "issuedate":
      return "dateValue"
    case "amount":
    case "balance":
      return "numberValue"
    default:
      return "stringValue"
    // case "currency":
    // case "issuer":
    // case "purpose":
    // case "type":
    // default:
    //   return undefined
  }
}

export function getFieldType(field: TAutomationRuleField) {
  switch (field) {
    case "issuedate":
      return "date"
    case "amount":
    case "balance":
      return "number"
    case "currency":
    case "issuer":
    case "purpose":
    case "type":
      return "string"
    default:
      return undefined
  }
}

export function getOperationType(field: TAutomationRuleField) {
  switch (field) {
    case "issuedate":
      return dateOperationValues
    case "amount":
    case "balance":
      return numberOperationValues
    case "currency":
    case "issuer":
    case "purpose":
    case "type":
      return stringOperationValues
    default:
      return [...dateOperationValues, ...numberOperationValues, ...stringOperationValues]
  }
}

export interface OperationValue {
  value: AutomationRuleWithCategories["operation"]
  label: string
}
export const dateOperationValues: OperationValue[] = [
  {
    value: "before",
    label: "before",
  },
  {
    value: "after",
    label: "after",
  },
]
export const numberOperationValues: OperationValue[] = [
  {
    value: "lessthan",
    label: "lessthan",
  },
  {
    value: "equal",
    label: "equal",
  },
  {
    value: "morethan",
    label: "morethan",
  },
]
export const stringOperationValues: OperationValue[] = [
  {
    value: "includes",
    label: "includes",
  },
  {
    value: "excludes",
    label: "excludes",
  },
]

export interface FieldValue {
  value: TAutomationRuleField
  label: string
}
export const fieldValues: FieldValue[] = [
  {
    value: "issuedate",
    label: "issuedate",
  },
  {
    value: "issuer",
    label: "issuer",
  },
  {
    value: "type",
    label: "type",
  },
  {
    value: "purpose",
    label: "purpose",
  },
  {
    value: "balance",
    label: "balance",
  },
  {
    value: "amount",
    label: "amount",
  },
  {
    value: "currency",
    label: "currency",
  },
]
