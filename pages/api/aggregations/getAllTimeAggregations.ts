// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { AllTimeAggregations, TransactionWithCategory } from "../../../types/types"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: AllTimeAggregations | undefined
}

export default async function getAllTimeAggregations(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const transactions = await prisma.transaction.findMany({
        orderBy: [{ issuedate: "desc" }],
        include: { category: true, _count: true },
      })

      if (transactions.length <= 0) {
        return res.status(200).json({ data: undefined })
      }

      const firstTransaction = { ...transactions[transactions.length - 1] }
      const lastTransaction = { ...transactions[0] }

      const sortedData = sortTransactions(transactions, "desc")

      const startDate = firstTransaction.issuedate || new Date()
      const endDate = lastTransaction.issuedate || new Date()
      const currency = lastTransaction.balanceCurrency || ""
      const preBalance = (firstTransaction.balance || 0) - (firstTransaction.amount || 0)

      const totalPlus = sortedData
        .filter(t => t && t.amount && t.amount > 0)
        .reduce((sum, t) => sum + (t.amount || 0), 0)

      const totalMinus = sortedData
        .filter(t => t && t.amount && t.amount <= 0)
        .reduce((sum, t) => sum + (t.amount || 0), 0)

      const totalPlusPercentage =
        (Math.abs(totalPlus) / (Math.abs(totalPlus) + Math.abs(totalMinus))) * 100 || 0
      const totalMinusPercentage =
        (Math.abs(totalMinus) / (Math.abs(totalPlus) + Math.abs(totalMinus))) * 100 || 0

      const categoriesRaw = await prisma.category.findMany({
        include: {
          transactions: true,
          _count: true,
        },
      })
      const categories = categoriesRaw.map(c => ({
        ...c,
        transactionBalance: Math.abs(c.transactions.reduce((sum, t) => (sum += t.amount || 0), 0)),
      }))

      const data = {
        totalPlus,
        totalMinus,
        startDate,
        endDate,
        currency,
        preBalance,
        totalPlusPercentage,
        totalMinusPercentage,
        transactions,
        categories,
      }

      res.json({ data })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
// TODO: replace with saved order to DB
function sortTransactions(
  transactions: TransactionWithCategory[],
  sortDirection: "asc" | "desc" = "desc"
) {
  const isDesc = sortDirection === "desc"
  const sorted = [...transactions].sort((a, b) => {
    if (!a.issuedate || !b.issuedate) return 0

    const aDate = new Date(a.issuedate).getTime()
    const bDate = new Date(b.issuedate).getTime()

    if (aDate < bDate) return isDesc ? 1 : -1

    if (aDate > bDate) return isDesc ? -1 : 1

    if (aDate === bDate) {
      if (a.balance === null || a.amount === null || b.balance === null || b.amount === null) {
        return 0
      }
      return isDesc ? 1 : -1
    }
    return 0
  })
  return sorted
}
