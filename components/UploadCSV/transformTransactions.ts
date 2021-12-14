import type { Prisma } from ".prisma/client"
import { ParsedCSVTransactions } from "../../types/types"

// expects "19.03.2020"
// returns "2020-03-19T00:00:00+00:00"
function transformDate(value?: string) {
  if (!value) return null
  const date = value.split(".").reverse().join("-") + "T00:00:00+00:00"
  if (isNaN(Date.parse(date))) return null
  return new Date(date)
}
// expects "-19,23"
// returns -19.23
function transformNumber(value?: string) {
  if (!value) return null
  const number = Number(value.replaceAll(".", "").replaceAll(",", "."))
  if (isNaN(number)) return null
  return number
}

const transformTransactions = async (transactions: ParsedCSVTransactions[]) => {
  const values: Prisma.TransactionCreateInput[] = transactions

    .map(({ issuedate, issuer, type, purpose, balance, amount, currency }) => ({
      issuedate: transformDate(issuedate),
      issuer: issuer,
      type: type,
      purpose: purpose,
      balance: transformNumber(balance),
      amount: transformNumber(amount),
      currency: currency,
    }))
    .filter(value => {
      if (!value.amount || !value.balance || !value.issuedate) return false
      return true
    })
    .map(transaction => ({
      ...transaction,
      identifier:
        (transaction.amount || 0) +
        (transaction.balance || 0) +
        (transaction.issuedate?.getTime() || 0),
    }))
  return values
}

export default transformTransactions
