import type { InferGetStaticPropsType } from "next"

import useGetTransactions from "../components/hooks/useGetTransactions"
import useGetCategories from "../components/hooks/useGetCategories"
import { AutomationRule, TransactionRuleFields, TransactionWithCategories } from "../types/types"
import { Prisma, Category, Transaction } from ".prisma/client"

export const getStaticProps = async () => {
  return { props: {} }
}

const PlaygroundPage = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    data: transactions,
    isError: isErrorTransactions,
    isLoading: isLoadingTransactions,
    mutate: mutateTransactions,
  } = useGetTransactions()

  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    mutate: mutateCategories,
  } = useGetCategories()
  if (isLoadingTransactions || isLoadingCategories) return <div>loading</div>
  if (!transactions || !categories) return <div>no data</div>

  return (
    <div>
      <Transformator transactions={transactions} categories={categories} />
    </div>
  )
}

export default PlaygroundPage

interface LL {
  transactions: TransactionWithCategories[]
  categories: Category[]
}
const Transformator = ({ transactions, categories }: LL) => {
  const rules: AutomationRule[] = [
    {
      field: "issuer",
      operation: "includes",
      categories: [categories[0]],
      stringValue: "rewe",
    },
    {
      field: "issuer",
      operation: "includes",
      categories: [categories[1]],
      stringValue: "paypal",
    },
  ]

  const { transformedTransactions: newt, transformedTransactionsDisplay } =
    assignCategoriesToNewTransactions(transactions as any, rules)
  const { transformedTransactions, untouchedTransactions } = assignCategoriesToTransactions(
    transactions,
    rules
  )

  return <div>yes</div>
}

function assignCategoriesToNewTransactions(
  transactions: Prisma.TransactionUncheckedCreateInput[],
  rules: AutomationRule[]
) {
  const transformedTransactions: Prisma.TransactionCreateInput[] = []
  const transformedTransactionsDisplay: (Prisma.TransactionUncheckedCreateInput & {
    categories: Category[]
  })[] = []

  transactions.forEach(transaction => {
    const categoriesToApply: Category[] = []

    rules.forEach(rule => {
      const result = applyRule(rule, transaction)
      categoriesToApply.push(...result)
    })

    const displayCategories = [
      ...Array.from(new Map(categoriesToApply.map(c => [c.id, c])).values()),
    ]
    const categories: Prisma.CategoryCreateNestedManyWithoutTransactionsInput["connect"] =
      displayCategories.map(cat => ({ id: cat.id }))
    transformedTransactions.push({ ...transaction, categories: { connect: categories } })
    transformedTransactionsDisplay.push({ ...transaction, categories: displayCategories })
  })

  return { transformedTransactions, transformedTransactionsDisplay }
}

function assignCategoriesToTransactions(
  transactions: TransactionWithCategories[],
  rules: AutomationRule[]
) {
  const transformedTransactions: TransactionWithCategories[] = []
  const untouchedTransactions: TransactionWithCategories[] = []

  transactions.forEach(transaction => {
    const categoriesToApply: Category[] = []

    rules.forEach(rule => {
      const result = applyRule(rule, transaction)
      categoriesToApply.push(...result)
    })

    if (categoriesToApply.length > 0) {
      transaction.categories = [
        ...Array.from(new Map(categoriesToApply.map(c => [c.id, c])).values()),
      ]
      transformedTransactions.push(transaction)
      return
    } else {
      // TODO: does make no sense? transactions already hold the categories wanted
      // if (transaction.categories) {
      //   categoriesToApply.push(...transaction.categories)
      // }
      // transaction.categories = [
      //   ...Array.from(new Map(categoriesToApply.map(c => [c.id, c])).values()),
      // ]
      untouchedTransactions.push(transaction)
      return
    }
  })
  return {
    transformedTransactions,
    untouchedTransactions,
  }
}

function isWithCategories(
  transaction: TransactionWithCategories | Prisma.TransactionUncheckedCreateInput
): transaction is TransactionWithCategories {
  return (transaction as TransactionWithCategories).categories !== undefined
}

// TODO: Bonus: create AND/OR combined rulesets? hierachy: category -> rule1, rule2...
function applyRule(
  rule: AutomationRule,
  transaction: TransactionWithCategories | Prisma.TransactionUncheckedCreateInput
) {
  const fieldValue = transaction[rule.field]
  switch (rule.operation) {
    case "includes": {
      if (
        fieldValue &&
        typeof fieldValue === "string" &&
        rule.stringValue &&
        fieldValue.toLowerCase().includes(rule.stringValue.toLowerCase())
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "excludes": {
      if (
        fieldValue &&
        typeof fieldValue === "string" &&
        rule.stringValue &&
        !fieldValue.toLowerCase().includes(rule.stringValue.toLowerCase())
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "equal": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue === rule.numberValue
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "lessthan": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue < rule.numberValue
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "morethan": {
      if (
        fieldValue &&
        typeof fieldValue === "number" &&
        rule.numberValue &&
        fieldValue > rule.numberValue
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      }
    }
    case "before": {
      if (
        fieldValue &&
        fieldValue instanceof Date &&
        fieldValue.getTime() &&
        rule.dateValue &&
        fieldValue.getTime() < rule.dateValue.getTime()
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      } else {
        return []
      }
    }
    case "after": {
      if (
        fieldValue &&
        fieldValue instanceof Date &&
        fieldValue.getTime() &&
        rule.dateValue &&
        fieldValue.getTime() > rule.dateValue.getTime()
      ) {
        if (isWithCategories(transaction)) {
          return rule.categories.filter(element => transaction.categories.includes(element))
        }
        return rule.categories
      }
    }
    default:
      return []
  }
}
