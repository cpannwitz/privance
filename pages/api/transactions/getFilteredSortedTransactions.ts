// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { TransactionWithCategory } from "../../../types/types"
import qs from "query-string"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategory[]
}

export default async function getFilteredSortedTransactions(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { query } = qs.parseUrl(req.url ?? "", {
      arrayFormat: "bracket",
      parseBooleans: true,
      parseNumbers: true,
    })
    // ! https://www.npmjs.com/package/query-string
    const { sortDirection, startDate, endDate, onlyIncome, onlySpending } = query

    // ! https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
    try {
      const checkedOnlyIncome = Boolean(onlyIncome) ? 0 : undefined
      const checkedOnlySpending = Boolean(onlySpending) ? 0 : undefined
      const checkedStartDate = typeof startDate === "string" && startDate ? startDate : undefined
      const checkedEndDate = typeof endDate === "string" && endDate ? endDate : undefined
      const checkedSortDirection =
        typeof sortDirection === "string" && sortDirection
          ? (sortDirection as "asc" | "desc")
          : "desc"
      const data = await prisma.transaction.findMany({
        where: {
          amount: {
            gt: checkedOnlyIncome,
            lt: checkedOnlySpending,
          },
          issuedate: {
            gte: checkedStartDate,
            lte: checkedEndDate,
          },
        },
        include: { category: true, _count: true },
      })
      const sortedData = sortTransactions(data, checkedSortDirection)
      res.json({ data: sortedData })
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
