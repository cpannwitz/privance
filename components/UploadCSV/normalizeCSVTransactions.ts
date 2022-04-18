import { ParsedCSVTransactions, TransactionBeforeUpload } from "../../types/types"

// expects "19.03.2020"
// returns "2020-03-19T00:00:00+00:00"
function transformDate(value?: string) {
  if (!value) return undefined
  const date = value.split(".").reverse().join("-") + "T00:00:00+00:00"
  if (isNaN(Date.parse(date))) return undefined
  return new Date(date)
}
// expects "-19,23"
// returns -19.23
function transformNumber(value?: string) {
  if (!value) return undefined
  const number = Number(value.replaceAll(".", "").replaceAll(",", "."))
  if (isNaN(number)) return undefined
  return number
}

function createIdentifier(transaction: Partial<TransactionBeforeUpload>) {
  return (
    (new Date(transaction.issuedate!)?.getTime() || 0) +
    (transaction.balance! || 0) +
    (transaction.amount! || 0)
  )
}

const normalizeCSVTransactions = async (transactions: ParsedCSVTransactions[]) => {
  const values: TransactionBeforeUpload[] = transactions
    .map(
      ({ issuedate, issuer, type, purpose, balance, balanceCurrency, amount, amountCurrency }) => ({
        issuedate: transformDate(issuedate),
        issuer: issuer,
        type: type,
        purpose: purpose,
        balance: transformNumber(balance),
        balanceCurrency: balanceCurrency,
        amount: transformNumber(amount),
        amountCurrency: amountCurrency,
        category: undefined,
        identifier: createIdentifier({
          issuedate,
          balance: transformNumber(balance),
          amount: transformNumber(amount),
        }),
      })
    )
    // TODO: remove when properties not optional anymore
    .filter(value => {
      if (!value.amount || !value.balance || !value.issuedate) return false
      return true
    })
  return values
}

export default normalizeCSVTransactions
