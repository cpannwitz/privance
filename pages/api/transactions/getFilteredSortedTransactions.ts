// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from ".prisma/client"
import { TransactionWithCategories } from "../../../types/types"
import qs from "query-string"

const prisma = new PrismaClient()

type ResponseData = {
  error?: any
  data?: TransactionWithCategories[]
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
    const { sortDirection, startDate, endDate } = query
    // TODO: wtf, better query extracting -> querystring
    // ! https://www.npmjs.com/package/query-string
    // ! https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
    try {
      const checkedStartDate = typeof startDate === "string" && startDate ? startDate : undefined
      const checkedEndDate = typeof endDate === "string" && endDate ? endDate : undefined
      const checkedSortDirection =
        typeof sortDirection === "string" && sortDirection
          ? (sortDirection as "asc" | "desc")
          : "desc"
      const data = await prisma.transaction.findMany({
        where: {
          issuedate: {
            gte: checkedStartDate,
            lte: checkedEndDate,
          },
        },
        orderBy: [
          {
            issuedate: checkedSortDirection,
          },
          {
            balance: checkedSortDirection,
          },
        ],
        include: { categories: true, _count: true },
      })
      res.json({ data })
    } catch (err) {
      console.error(`ERROR | err`, err)
      res.status(500).json({ error: err })
    }
  } else {
    res.status(405).json({ error: "wrong http method" })
  }
}
