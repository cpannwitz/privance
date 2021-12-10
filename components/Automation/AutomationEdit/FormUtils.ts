import * as yup from "yup"
import { AutomationRule, TransactionRuleFields } from "../../../types/types"

export const parseDateToString = (date?: Date) => {
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
      is: (fieldValue: keyof TransactionRuleFields) => getInputType(fieldValue) === "text",
      then: yup.string().required("Please fill in an appropiate value."),
    }),
    numberValue: yup.number().when("field", {
      is: (fieldValue: keyof TransactionRuleFields) => getInputType(fieldValue) === "number",
      then: yup.number().required("Please fill in an appropiate value."),
    }),
    dateValue: yup.string().when("field", {
      is: (fieldValue: keyof TransactionRuleFields) => getInputType(fieldValue) === "date",
      then: yup.string().required("Please fill in an appropiate value."),
    }),
  })
  .required()

export function getInputType(field: keyof TransactionRuleFields | string) {
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
      return "text"
    default:
      return "disabled"
  }
}

export function getOperationType(field: keyof TransactionRuleFields) {
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
  value: AutomationRule["operation"]
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
  value: keyof TransactionRuleFields
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
